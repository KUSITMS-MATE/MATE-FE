import { Top, Asset, Text } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";

export function TestImageStep() {
  return (
    <div>
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

      <div className="px-5">
        <button
          type="button"
          style={{
            width: 88,
            height: 88,
            backgroundColor: "var(--token-tds-color-grey-100, var(--adaptiveGrey100, #f2f4f6))",
            borderRadius: 16,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Asset.Icon
            frameShape={Asset.frameShape.CleanW24}
            backgroundColor="transparent"
            name="icon-camera-mono"
            color={adaptive.grey600}
            aria-hidden={true}
            ratio="1/1"
          />
          <div style={{ display: "flex" }}>
            <Text color={adaptive.grey500} typography="t7" fontWeight="medium">
              0
            </Text>
            <Text color={adaptive.grey500} typography="t7" fontWeight="medium">
              /10
            </Text>
          </div>
        </button>
      </div>
    </div>
  );
}
