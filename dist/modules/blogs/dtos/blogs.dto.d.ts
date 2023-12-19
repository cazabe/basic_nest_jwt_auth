import { STATUS } from '../../../constants';
export declare class BlogsDto {
    title: string;
    image_url: string;
    content: string;
    reference_link: string;
    status: STATUS;
    categories?: string[];
}
