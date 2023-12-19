import { STATUS } from '../../../constants';
export declare class NewsUpdateDto {
    title: string;
    image_url: string;
    content: string;
    reference_link: string;
    status: STATUS;
    categories?: string[];
}
