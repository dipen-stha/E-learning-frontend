export interface ContentDetail {
    id: number
    title: string
    description: string | null
    file_url: string | null
    content_type: string
    completion_time: number
    order: number
}

export interface ContentState {
    contenDetails: ContentDetail[]
    contentItem: ContentDetail

    fetchContentDetails: () => void;
    createContentItem: (contentPayload: ContentDetail) => void;
    // fetchContentById: ()
}