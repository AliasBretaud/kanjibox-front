import WordCard from "@/components/word/WordCard";
import type { $Word } from "@/types/models";
import { render, screen } from "@testing-library/react";

const wordMock: $Word = {
  value: "言葉",
  furiganaValue: "ことば",
  translations: {
    en: ["Word"],
  },
};

describe("WordCard component tests", () => {
  it("renders the component", () => {
    render(<WordCard {...wordMock} locale="en" />);

    const furiganaValue = screen.getByText("ことば");
    const translation = screen.getByText("Word");
    "言葉"
      .split("")
      .map((c) => screen.getByText(c))
      .forEach((v) => expect(v).toBeInTheDocument());
    expect(furiganaValue).toBeInTheDocument();
    expect(translation).toBeInTheDocument();
  });

  it("renders WordCard unchanged", () => {
    const { container } = render(<WordCard {...wordMock} locale="en" />);
    expect(container).toMatchSnapshot();
  });
});
