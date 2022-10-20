import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  registerName: string;
  dataArray: { id: number; data: string }[];
  onChangeEvent: (e: any) => void;
};

export const SelectBox = (props: Props) => {
  type Inputs = { displayCvTerm: string };

  const { register } = useForm<Inputs>();

  <select
    {...register(props.registerName, {
      // onChange: (e) => onChangeDisplayCvTerm(e.target.value as number),
      onChange: props.onChangeEvent,
    })}
  >
    {props.dataArray.map(({ id, data }) => (
      <option key={id} value={id.toString()}>
        {data}
      </option>
    ))}
  </select>;
};
