import { Top } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";

export function TestImageStep() {
  return (
    <Top
      title={
        <Top.TitleParagraph size={22} color={adaptive.grey900}>
          테스트를 나타낼 수 있는 이미지를 첨부해주세요
        </Top.TitleParagraph>
      }
      subtitleBottom={
        <Top.SubtitleParagraph size={15} color={adaptive.blue500}>
          16:9 비율이 최적이에요.
        </Top.SubtitleParagraph>
      }
    />
  );
}
