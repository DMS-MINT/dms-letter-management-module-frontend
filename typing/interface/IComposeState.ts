interface IComposeValue {
  value: number;
  label: string;
}
export interface IComposeState {
  sender: Array<IComposeValue> | [];
  recipient: Array<IComposeValue> | [];
  cc: Array<IComposeValue> | [];
  bcc: Array<IComposeValue> | [];
  subject: Array<IComposeValue> | [];
  content: Array<IComposeValue> | [];
}
