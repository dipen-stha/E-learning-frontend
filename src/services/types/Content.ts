import { ContentVideoTimeStamps } from "./Course"

export interface ContentDetail {
    id: number
    title: string
    description: string | null
    file_url: string | null
    content_type: string
    completion_time: number
    order: number
    video_time_stamps?: ContentVideoTimeStamps[]
}

export interface ContentState {
    contenDetails: ContentDetail[]
    contentItem: ContentDetail

    fetchContentDetails: () => void;
    createContentItem: (contentPayload: ContentDetail) => void;
    // fetchContentById: ()
}