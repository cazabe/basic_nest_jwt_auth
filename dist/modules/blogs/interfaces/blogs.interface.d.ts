import { STATUS } from '../../../constants';
export interface IBlogs {
    title: string;
    image_url: string;
    content: string;
    reference_link: string;
    status: STATUS;
}
