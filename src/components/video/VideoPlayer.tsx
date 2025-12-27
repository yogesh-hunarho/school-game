import { type VideoPlayerProps } from "@/lib/video-types";
import { useVideoController } from "@/hook/use-video-controller";
import VideoControls from "./VideoControls";

export default function VideoPlayer(props: VideoPlayerProps) {
  const controller = useVideoController(props);

  return (
    <div onClick={controller.togglePlay} className={`relative bg-black overflow-hidden ${controller?.isFullscreen ? "fixed inset-0 z-50" : "aspect-video"}`}>
      <video
        ref={controller.videoRef}
        className="absolute inset-0 w-full h-full object-contain"
        playsInline
        controls={false}
      />

      {props.controls !== false && (
        props.renderControls ? (
          props.renderControls(controller as any)
        ) : (
          <div onClick={(e) => e.stopPropagation()}>
            <VideoControls {...controller} {...props} />
          </div>
        )
      )}
    </div>
  );
}


// Usage Examples

{/* <VideoPlayer src={lesson.videoUrl} /> */ }
{/* <VideoPlayer
  src={lesson.videoUrl}
  onPlay={() => track("video_play")}
  onPause={() => track("video_pause")}
  onTimeUpdate={(t) => saveProgress(lesson.id, t)}
  startTime={savedProgress}
/> */}

{/* <VideoPlayer
  src={lesson.videoUrl}
  renderControls={(ctx) => (
    <div className="absolute bottom-0 p-6">
      <button onClick={ctx.togglePlay}>
        {ctx.isPlaying ? "Pause Lesson" : "Start Lesson"}
      </button>
    </div>
  )}
/> */}