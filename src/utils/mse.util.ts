const NUM_CHUNKS = 10;

export const readMse = (videoElement: HTMLVideoElement, url: string) => {

    const ms = new MediaSource();
    function startup () {
        ms.addEventListener('sourceopen', openedNew, false);
        ms.addEventListener('sourceclose', closed, false);

        videoElement.src = URL.createObjectURL(ms);
    }

    function openedNew () {
        const sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
        get(url, (data) => {
            sourceBuffer.appendBuffer(data);
        })
    }

    function opened () {
        const sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
        console.log(sourceBuffer);
        get(url, function (uInt8Array: ArrayBuffer) {
            const file = new Blob([uInt8Array], {
                type: 'video/webm'
            });

            const chunkSize = Math.ceil(file.size / NUM_CHUNKS);

            // Slice the video into NUM_CHUNKS and append each to the media element.
            let i = 0;

            (function readChunk_(i) { // eslint-disable-line no-shadow
                const reader = new FileReader();

                // Reads aren't guaranteed to finish in the same order they're started in,
                // so we need to read + append the next chunk after the previous reader
                // is done (onload is fired).
                reader.onload = function(e : any) {
                    sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
                    if (i === NUM_CHUNKS - 1) {
                        sourceBuffer.addEventListener('updateend', function() {
                            if (!sourceBuffer.updating && ms.readyState === 'open') {
                                ms.endOfStream();
                            }
                        });
                    } else {
                        if (videoElement.paused) {
                            videoElement.play(); // Start playing after 1st chunk is appended.
                        }
                        readChunk_(++i);
                    }
                };

                const startByte = chunkSize * i;
                const chunk = file.slice(startByte, startByte + chunkSize);

                reader.readAsArrayBuffer(chunk);
            })(i);
        });
    }

    function get(url: string, callback: (arrayBuffer: ArrayBuffer) => void) {
        fetch(url).then(res => res.arrayBuffer()).then(data => {
            callback(data);
        })
        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', url, true);
        // xhr.responseType = 'arraybuffer';
        // xhr.send();
        //
        // xhr.onload = function () {
        //     if (xhr.status !== 200) {
        //         alert('Unexpected status code ' + xhr.status + ' for ' + url);
        //         return false;
        //     }
        //     callback(new Uint8Array(xhr.response));
        // };
    }

    function closed() {

    }

    startup();
}
