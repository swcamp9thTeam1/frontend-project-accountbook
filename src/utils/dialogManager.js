const openDialog = (querySelector) => {
    const modalEl = document.querySelector(querySelector);
    modalEl.showModal();
}
const closeDialog = (querySelector) => {
    const modalEl = document.querySelector(querySelector);
    modalEl.close();
}

const QuerySelector = {
    StoreDetail: "dialog.modal-store-detail",
    ReviewDetail: "dialog.modal-review-detail"
};

/* 가게 상세 보기 Modal */
export const openStoreDetailDialog = () => {
    openDialog(QuerySelector.StoreDetail);
}
export const closeStoreDetailDialog = () => {
    closeDialog(QuerySelector.StoreDetail);
}

/* 리뷰 상세보기 Modal */
export const openReviewDetailDialog = () => {
    openDialog(QuerySelector.ReviewDetail);
}
export const closeReviewDetailDialog = () => {
    closeDialog(QuerySelector.ReviewDetail);
}