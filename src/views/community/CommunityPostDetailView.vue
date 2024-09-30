<template>
    <div class="post-list" v-if="post">
        <span style="color:#101424; font-size: 27px; margin-top:13px; margin-right: 41px; font-weight: bold;">{{ post.title }}</span>
        <div style="color: #8C8C8C; margin-top: 25px;">
            <span style="font-size: 17px; color: black;">{{ post.nickname }}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <div style="color: #8C8C8C; margin-top: 4px;">
                <span style="font-size: 13px;">작성일: {{ post.created_at }} | 댓글 수: {{ post.comment_count }}</span>
            </div>
            <div v-if="editOrDeleteButton" style="margin-left: 680px;">
                <button class="editOrDeleteButton font-300" @click="modifyButton">수정</button>
                <button class="editOrDeleteButton font-300" @click="deleteButton" style="background-color: black;">삭제</button>
            </div>
        </div>

        <span class="post-content" style="color:#101424; margin-top:25px;">
            <hr class="hr1">
            <p>{{ post.content }}</p>
            <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
            <hr class="hr2">
        </span>

        <span class="numOfComment"> 
            댓글 {{ post.comment_count }}개
        </span>

        <div v-if="post" style="margin-left: 20px;">
            <!-- 댓글이 없을 때 표시 -->
            <div v-if="post.comments && post.comments.length === 0">
                <p>댓글이 없습니다.</p>
            </div>
            
            <!-- 댓글 렌더링 -->
            <div v-for="comment in post.comments" :key="comment.id">
                <div class="comment">
                    <div style="display: flex;">
                        <img class="profileimg" src="/src/assets/icons/Community/CommentProfileIcon copy.svg" alt="">
                        <div class="commentinfo">
                            <span class="comment-nickname">{{ comment.nickname }}</span>
                            <span class="comment-timeinfo">{{ comment.created_at }}</span>
                        </div>
                    </div>
                    <span class="commentcontent">{{ comment.content }}</span>
                    <button class="replybtn" @click="writeCommentReply(comment)">답글</button>
                    <!-- 대댓글 입력 -->
                    <div v-if="comment.replyStatus" class="commentReplyInput">
                        <textarea v-model="comment.replyContent" class="commentReplytextarea" placeholder="답글을 입력해주세요"></textarea>
                        <button class="comment-registbtn"
                                @click="registReplyComment(comment)"
                        >
                        등록
                        </button>
                    </div>
                    
                </div>   
                <!-- 대댓글 렌더링 -->
                <div class="commentReply" v-for="subComment in comment.subComments" :key="subComment.id">
                    <div style="display: flex;">
                        <img class="profileimg" src="/src/assets/icons/Community/CommentProfileIcon copy.svg" alt="">
                        <div class="commentinfo">
                            <span class="comment-nickname">{{ subComment.nickname }}</span>
                            <span class="comment-timeinfo" style="font-size: 10px; color:#8C8C8C;">{{ subComment.created_at }}</span>
                        </div>
                    </div>
                    <span class="commentcontent">{{ subComment.content }}</span>
                </div>
            </div>


            <!-- 댓글 입력 -->
            <div style="display: flex; margin-top: 20px;">
                <textarea v-model="newCommentContent" class="comment-textarea" placeholder="댓글을 입력해주세요"></textarea>
                <button class="comment-registbtn" @click="registComment">
                    등록
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const post = ref(null);
const route = useRoute();
const router = useRouter();
const editOrDeleteButton = ref(false);  // 초기값 false로 지정 
const newCommentContent = ref('');

/* 게시글 가져오기 */
onMounted(async () => {
    const postId = route.params.id;
    try {
        const response = await fetch(`http://localhost:8080/community-post/${postId}`);
        post.value = await response.json();

        // post.comments가 없으면 빈 배열로 초기화
        post.value.comments = post.value.comments || [];

        // 로그인한 회원의 닉네임
        const loggedInUserNickname = localStorage.getItem('nickname');

        // 게시글 작성자 닉네임과 로그인한 회원의 닉네임 비교 -> 일치하는 닉네임 게시글만 수정, 삭제 버튼 보이도록
        editOrDeleteButton.value = post.value.nickname === loggedInUserNickname;
    } catch (error) {
        console.error('게시글 조회 실패 ', error);
    }
});

/* 수정 삭제 버튼 클릭하면 이동*/
const modifyButton = () => {
    console.log('수정 버튼 클릭됨');
    router.push(`/community/free-board/editPost/${post.value.id}`); // 수정 페이지로 이동
};

const deleteButton = async () => {
    console.log('삭제 버튼 클릭됨');
    const confirmed = confirm("정말로 이 게시글을 삭제하시겠습니까?");
    if (confirmed) {
        try {
            await fetch(`http://localhost:8080/community-post/${post.value.id}`, {
                method: 'DELETE',
            });
            alert("게시글이 삭제되었습니다.");
            router.push('/community/free-board'); // 삭제 후 목록 페이지로 이동
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
            alert("게시글 삭제에 실패했습니다.");
        }
    }
};

const writeCommentReply = (comment) => {
    comment.replyStatus = !comment.replyStatus; // 이벤트 발생 시 댓글 상태 바꿔줌
    console.log('답글 버튼 눌림', comment);
    console.log(comment.replyStatus)

    // 댓글 버튼을 누르면 -> 댓글이 추가되기 때문에 -> 댓글 개수 + 1 -> post.comment_count += 1 이게 되나 ...
    //json 에 데이터를 추가하는 메소드 
    // 댓글과 답글을 하나의 메소드에 넣어도 괜찮은가? (replyStatus로 댓글인지, 답글인지 구분할 수 있도록)

    // 입력 필드 초기화 
    comment.replyContent = '';
};


// 댓글 등록 -> 버튼 클릭 시 구현될 메소드
const registComment = async() => {

    //json에 추가하기
    const newComment = {
        content: newCommentContent.value,
        nickname: localStorage.getItem('nickname'),
        created_at: new Date().toISOString(),
        subComments: []
    };

    post.value.comments.push(newComment);
    post.value.comment_count += 1;

        // 서버에 POST 요청 보내기 (댓글 추가)
        await fetch(`http://localhost:8080/community-post/${post.value.id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    });

    newCommentContent.value = '';  // 입력창 초기화
    
}

// 대댓글 등록 -> 버튼 클릭 시 구현될 메소드 
const registReplyComment = async(comment) => {

        // json에 추가하기
        const newReply = {
        content: comment.replyContent,
        nickname: localStorage.getItem('nickname'),
        created_at: new Date().toISOString()
    };

    post.value.comment_count += 1;

    comment.subComments.push(newReply);

    // 서버에 POST 요청 보내기 (답글 추가)
    await fetch(`http://localhost:8080/community-post/${post.value.id}/comments/${comment.id}/replies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReply)
    });

    comment.replyStatus = false; // 답글 입력창 닫기
    comment.replyContent = '';  // 입력창 초기화


}

</script>



<style scoped>
.editOrDeleteButton {
    background-color: #B1B1D2;
    border: none;
    padding: 2px 11px;
    margin-right: 5px;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
}

.font-300 {
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
}

.font-500 {
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
}

.numOfComment{
    display: inline-block; 
    width: 94px; 
    height: 36px; 
    background-color: #101424; 
    color: white; 
    border-radius: 18px; 
    font-size: 15px;
    text-align: center; 
    line-height: 36px;
    font-weight: lighter;
    margin-top: 20px;
}

.post-list{
    width: 1000px; 
    height: auto; 
    background-color: #F9F9FF; 
    border-radius: 11px; 
    box-shadow:0 0 5px rgba(198, 198, 235, 0.5); 
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 20px 41px; 
    justify-content: space-between;
    align-items: flex-start;
    
}


.comment{
        width: 900px;
        height: auto; 
        background-color: white; 
        border-radius: 10px; 
        box-shadow:0 0 5px rgba(198, 198, 235, 0.5);
        display:flex; 
        flex-direction: column;
        padding:17px; 
        justify-content: flex-start;
        margin-top: 18px;
    }


    .commentReply{
        width: 840px; 
        height: auto; 
        background-color: #F9F9FF; 
        border-radius: 10px; 
        box-shadow:0 0 5px rgba(198, 198, 235, 0.5);
        display:flex; 
        flex-direction: column;
        padding: 6px 24px;
        justify-content: flex-start;
        margin-top: 8px;
        margin-left: 46px;
    }

    .comment-textarea{
        width: 900px; 
        border: 1px solid #B1B1D2; 
        font-size: 19px;
    }

    .comment-textarea::placeholder{
        font-size: 15px;
        padding: 10px;
    }

    .commentReplytextarea{
        width: 100%; 
        border: 1px solid #B1B1D2
        
    }

    .comment-registbtn{
        top: 20px; 
        background-color: #B1B1D2; 
        border: 1px solid #B1B1D2; 
        padding: 2px 7px; 
        border-radius: 3px; 
        color: white; 
        font-weight: lighter; 
        font-size: 19px;
        text-wrap: nowrap;

    }

    .commentbox{
        display: flex; 
        justify-content: flex-start; 
        margin-bottom: 10px;

    }

    .commentinfo{
        display: flex; 
        flex-direction: column; 
        padding: 0 10px;

    }

    .commentcontent{
        padding:5px 0; 
        font-size: 15px;

        
    }

    .commentReplytextarea{

    }

    .replybtn{
        display: flex; 
        justify-content: flex-start; 
        margin-bottom: -9px;
        background-color: white;
        border-style: none;
        color: #8C8C8C

    }

    .profileimg{
        width: 32px;
    }

    .comment-nickname{
        font-size: 16px; 
        font-weight: bold;
    }
    .comment-timeinfo{
        font-size: 10px; 
        color:#8C8C8C;

    }

    .commentReplyInput{
        margin-top: 13px; 
        width: 900px;
        display: flex;
    }

    .post-content{
        color:#101424; 
        margin-top:25px;
    }

    .post-content .hr1{
        border: 0.2px solid #B1B1D2; width: 1000px;
    }

    .post-content p{
        margin-top: 50px; margin-left: 30px; font-size: 20px;
    }

    .post-content .hr2{
        border: 0.2px solid #B1B1D2; width: 1000px; margin-top: 50px;

    }


</style>
