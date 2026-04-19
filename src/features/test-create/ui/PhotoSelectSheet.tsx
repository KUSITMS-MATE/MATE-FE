import { BottomSheet, ListRow, Asset, Spacing } from "@toss/tds-mobile";

interface PhotoSelectSheetProps {
  open: boolean;
  onClose: () => void;
  onCamera: () => void;
  onAlbum: () => void;
}

export function PhotoSelectSheet({ open, onClose, onCamera, onAlbum }: PhotoSelectSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <ListRow
        as="button"
        className="w-full"
        left={
          <Asset.Image
            frameShape={Asset.frameShape.CleanW24}
            backgroundColor="transparent"
            src="https://static.toss.im/2d-emojis/png/4x/u1F4F7.png"
            aria-hidden={true}
            style={{ aspectRatio: "1/1" }}
          />
        }
        contents={<ListRow.Texts type="1RowTypeA" top="카메라로 찍기" />}
        verticalPadding="large"
        onClick={() => {
          onClose();
          onCamera();
        }}
      />
      <ListRow
        as="button"
        className="w-full"
        left={
          <Asset.Icon
            frameShape={Asset.frameShape.CleanW24}
            backgroundColor="transparent"
            name="icon-picture"
            aria-hidden={true}
            ratio="1/1"
          />
        }
        contents={<ListRow.Texts type="1RowTypeA" top="앨범에서 선택" />}
        verticalPadding="large"
        onClick={() => {
          onClose();
          onAlbum();
        }}
      />
      <Spacing size={24} />
    </BottomSheet>
  );
}
