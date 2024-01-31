import Heading from "@/components/Heading";
import { SharedSlice } from "@prismicio/client";

interface ProgrammableSliceProps<InjectedPropsType = any> {
  slice: SharedSlice;
  injectedProps: any;
  renderSectionContent: (props: any) => JSX.Element;
}

const ProgrammableSlice = <InjectedPropsType,>({
  slice,
  injectedProps,
  renderSectionContent,
}: ProgrammableSliceProps<InjectedPropsType>) => {
  if (slice.variation === "programmatic") {
    if (!injectedProps) {
      return (
        <section>
          <Heading as="h2" size="xl">
            {slice.slice_type} injectedProps is null!
          </Heading>
        </section>
      );
    } else {
      return (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          {renderSectionContent(injectedProps)}
        </section>
      );
    }
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {renderSectionContent(slice.primary)}
    </section>
  );
};

export default ProgrammableSlice;
