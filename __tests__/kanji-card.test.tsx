import KanjiCard from "@/components/kanji/KanjiCard";
import { ModalProvider } from "@/context/modalContext";
import type { $Kanji } from "@/types/models";
import { render, screen } from "@testing-library/react";

const kanjiMock: $Kanji = {
  value: "人",
  onYomi: ["ニン", "ジン"],
  kunYomi: ["ひと"],
  translations: {
    en: ["People", "Person"],
  },
};

describe("KanjiCard component tests", () => {
  it("renders the component", () => {
    render(
      <ModalProvider>
        <KanjiCard {...kanjiMock} locale="en" />
      </ModalProvider>,
    );

    const value = screen.getByText("人");
    const onYomi1 = screen.getByText("ニン");
    const onYomi2 = screen.getByText("ジン");
    const kunYomi = screen.getByText("ひと");
    const translation1 = screen.getByText("People");
    const translation2 = screen.getByText("Person");
    expect(value).toBeInTheDocument();
    expect(onYomi1).toBeInTheDocument();
    expect(onYomi2).toBeInTheDocument();
    expect(kunYomi).toBeInTheDocument();
    expect(translation1).toBeInTheDocument();
    expect(translation2).toBeInTheDocument();
  });

  it("renders homepage unchanged", () => {
    const { container } = render(
      <ModalProvider>
        <KanjiCard {...kanjiMock} locale="en" />
      </ModalProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
