import { PageMetaDtoParameters } from '../page-meta.interface';
export declare class PageMetaDto {
    readonly page: number;
    readonly take: number;
    readonly item_count: number;
    readonly page_count: number;
    readonly has_previous_page: boolean;
    readonly has_next_page: boolean;
    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters);
}
