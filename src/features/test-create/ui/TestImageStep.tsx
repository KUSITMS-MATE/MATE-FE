import { useState } from "react";
import { Top, Asset, Text } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import { openCamera, fetchAlbumPhotos, OpenCameraPermissionError, FetchAlbumPhotosPermissionError } from "@apps-in-toss/web-framework";
import { PhotoSelectSheet } from "./PhotoSelectSheet";

const MAX_IMAGES = 10;

export function TestImageStep() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [imageUris, setImageUris] = useState<string[]>([]);

  const addImages = (uris: string[]) => {
    setImageUris((prev) => {
      const remaining = MAX_IMAGES - prev.length;
      return [...prev, ...uris.slice(0, remaining)];
    });
  };

  const removeImage = (index: number) => {
    setImageUris((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCamera = async () => {
    try {
      const response = await openCamera({ base64: true, maxWidth: 1280 });
      addImages([`data:image/jpeg;base64,${response.dataUri}`]);
    } catch (error) {
      if (error instanceof OpenCameraPermissionError) {
        await openCamera.openPermissionDialog();
      } else {
        console.error("[handleCamera] error:", error);
      }
    }
  };

  const handleAlbum = async () => {
    try {
      const remaining = MAX_IMAGES - imageUris.length;
      if (remaining <= 0) return;
      const response = await fetchAlbumPhotos({ base64: true, maxWidth: 1280, maxCount: remaining });
      addImages(response.map((img) => `data:image/jpeg;base64,${img.dataUri}`));
    } catch (error) {
      if (error instanceof FetchAlbumPhotosPermissionError) {
        await fetchAlbumPhotos.openPermissionDialog();
      } else {
        console.error("[handleAlbum] error:", error);
      }
    }
  };

  return (
    <>
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

        <div className="px-5 flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide">
          {imageUris.length < MAX_IMAGES && (
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
                flexShrink: 0,
              }}
              onClick={() => setIsSheetOpen(true)}
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
                  {imageUris.length}
                </Text>
                <Text color={adaptive.grey500} typography="t7" fontWeight="medium">
                  /{MAX_IMAGES}
                </Text>
              </div>
            </button>
          )}

          {imageUris.map((uri, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: 88,
                height: 88,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 16,
                  overflow: "hidden",
                  padding: 6,
                  boxShadow: "inset 0 0 0 1px var(--token-tds-color-grey-opacity-100, var(--adaptiveGreyOpacity100, rgba(2,32,71,0.05)))",
                }}
              >
                <img
                  src={uri}
                  alt={`선택된 이미지 ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  display: "flex",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
                aria-label={`이미지 ${index + 1} 삭제`}
              >
                <Asset.Icon
                  frameShape={Asset.frameShape.CircleXSmall}
                  backgroundColor={adaptive.greyOpacity600}
                  name="icon-sweetshop-x-white"
                  scale={0.66}
                  aria-hidden={true}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <PhotoSelectSheet
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onCamera={handleCamera}
        onAlbum={handleAlbum}
      />
    </>
  );
}
