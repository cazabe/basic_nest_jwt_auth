import { STATUS } from '../../../constants';
export declare class NewsFilterDto {
    readonly search_pattern?: string;
    readonly start_date?: string;
    readonly end_date?: string;
    readonly status?: STATUS;
    readonly user_id?: string;
    readonly category_id?: string;
}
