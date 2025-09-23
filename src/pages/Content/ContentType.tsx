import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ContentDetail } from "@/services/types/Content";
import React, { useEffect, useRef, useState } from "react";

interface ContentTypeRenderProps {
  content: ContentDetail;
  contentFocused: boolean;
}

export const ContentTypeRender: React.FC<ContentTypeRenderProps> = ({
  content,
  contentFocused,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const togglePlay = (canPlay: boolean) => {
    if (!canPlay) return;
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    let frameId: number;
    const updatetime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        frameId = requestAnimationFrame(updatetime);
      }
    };

    if (isVideoPlaying) {
      frameId = requestAnimationFrame(updatetime);
    }
    return () => cancelAnimationFrame(frameId);
  }, [isVideoPlaying]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  const jumpTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}: ${seconds.toString().padStart(2, "0")}`;
  };
  // let contentFocused  =  status === "NOT_STARTED" || status === "IN_PROGRESS" ? false : true
  switch (content.content_type) {
    case "VIDEO":
      // const handleVideoEnded = () => {
      //   setIsVideoPlaying(false)
      // }
      return (
        <div className="space-y-4">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden group">
            <video
              ref={videoRef}
              src={content.file_url as string}
              className="w-full h-64 object-cover"
              muted={isMuted}
              onEnded={() => {
                setIsVideoPlaying(false);
                setCurrentTime(0);
                if (videoRef.current) videoRef.current.currentTime = 0;
              }}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {/* Play/Pause button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="lg"
                className="bg-white/90 hover:bg-white text-gray-900 rounded-full w-16 h-16"
                disabled={!contentFocused}
                onClick={() => togglePlay(contentFocused)}
              >
                {isVideoPlaying ? (
                  <Icon name="Pause" className="w-6 h-6" />
                ) : (
                  <Icon name="Play" className="w-6 h-6" />
                )}
              </Button>
            </div>

            {/* Mute button */}
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 hover:bg-black/70 text-white"
                disabled={!contentFocused}
                onClick={toggleMute}
              >
                {isMuted ? (
                  <Icon name="VolumeX" className="w-4 h-4" />
                ) : (
                  <Icon name="Volume2" className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          {/* Progress Bar */}
          <div className=" bottom-0 left-0 right-0 px-4 pb-2 flex items-center gap-2 text-gray-500 text-sm">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 accent-regal-blue"
              disabled={!contentFocused}
            />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Timestamps</h4>
            <ul className="space-y-1">
              {content.video_time_stamps?.map((ts, i) => (
                <li key={i}>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => jumpTo(ts.time_stamp as number)}
                  >
                    {formatTime(ts.time_stamp as number)} - {ts.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Description */}
          <p className="text-gray-600">{content.description}</p>
        </div>
      );

    case "TEXT":
      return (
        <div className="prose max-w-none">
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {content.description}
          </div>
        </div>
      );

    case "CODE":
      return (
        <div className="space-y-4">
          <p className="text-gray-600">{content.description}</p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{content.description}</code>
            </pre>
          </div>
        </div>
      );

    case "IMAGE":
      return (
        <div className="space-y-4">
          <img
            src={content.file_url || "/placeholder.svg"}
            alt={content.title}
            className="w-full rounded-lg border border-violet-200"
          />
          <p className="text-gray-600">{content.description}</p>
        </div>
      );

    default:
      return <div>Content type not supported</div>;
  }
};
