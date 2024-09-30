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
    ReviewDetail: "dialog.modal-review-detail",
    SuccessMessage: "dialog.modal-success-message"
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

/* 성공 메시지 Modal */
export const openSuccessMessageDialog = () => {
    openDialog(QuerySelector.SuccessMessage);

    // 3초 뒤에 자동으로 닫히도록 설정
    setTimeout(() => {
        closeDialog(QuerySelector.SuccessMessage);
    }, 2000);
}