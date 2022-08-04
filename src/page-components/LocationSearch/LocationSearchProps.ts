export interface LocationSearchProps {
    defaultValue: string;
    onChange?: (value: string) => void;
    onInputDone?: (value: string) => void;
    placeHolder?: string;
    desc?: string;
    className?: string;
    autoFocus?: boolean;
    onClickReset?: () => void
  }