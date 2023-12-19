import { STATUS } from '../../../constants';

export interface INews {
  title: string;
  image_url: string;
  content: string;
  reference_link: string;
  status: STATUS;
}
