import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { Simplify } from "../../../prismicio-types";
import ProgrammableSlice from "@/components/ProgrammableSlice";

/**
 * Props for `VideoPlayer`.
 */
export type VideoPlayerProps = SliceComponentProps<Content.VideoPlayerSlice> & {
  injectedProps?: Simplify<Content.VideoPlayerSliceDefaultPrimary>;
};

const renderSectionContent = (
  props: Simplify<Content.VideoPlayerSliceDefaultPrimary>,
) => (
  <div className="w-full">
    <PrismicNextImage
      field={props.thumbnail}
      className="h-auto w-full object-cover"
    />
  </div>
);

/**
 * Component for "VideoPlayer" Slices.
 */
const VideoPlayer = ({
  slice,
  injectedProps,
}: VideoPlayerProps): JSX.Element => {
  return (
    <ProgrammableSlice<VideoPlayerProps>
      slice={slice}
      injectedProps={injectedProps}
      renderSectionContent={renderSectionContent}
    />
  );
};

export default VideoPlayer;
