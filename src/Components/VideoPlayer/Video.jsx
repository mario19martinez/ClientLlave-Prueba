import VideoPlayer from "./VideoPlayer";

function Video () {
    const videoUrl = 'https://www.youtube.com/watch?v=vApEPLJfmnM'
    const title = 'Franco Escamilla'

    return (
        <div className="my-8 text-lg">
            <VideoPlayer videoUrl={videoUrl} title={title} />
        </div>
    )
}

export default Video