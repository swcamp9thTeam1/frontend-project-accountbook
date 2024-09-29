<template>

    
    <div style="padding: 20px; width: 1000px; margin-top: 83px;">


        <input class="input-title" type="text" placeholder="제목" style="font-size: 32px; background-color: none; border: none;"
                        v-model="title"/>

        <hr style="border: none; background-color: #B1B1D2; height: 1px; box-shadow: none;">

        <textarea name="" id="" placeholder="내용을 입력해주세요" v-model="content"></textarea>

        <hr style="border: none; background-color: #B1B1D2; height: 1px; box-shadow: none;margin-bottom: 30px;">



        <!-- 파일 등록 버튼 및 게시글 등록 버튼 -->
        <div style="display: flex; justify-content: space-around; align-items: center; height: 60px;">
        <label class="custom-file-upload">
            파일 선택
            <input type="file" id="fileInput" accept="image/*" @change="updateFileName" />
        </label>

        <div id="fileName">{{ fileName }}</div> <!-- 파일 이름을 표시할 요소 -->

        <button
            @click="submitPost"
            style="width: 90px; height: 50px; background-color: #101424; border-radius: 12px; font-size: 28px; color: white;"
        >
            등록
        </button>
        </div>

        
    </div>

            <!-- 알림창 띄우는 부분 -->
            <div :class="['notification', showNotification ? 'show' : 'hide']">
                <span style="font-size: 20px;">제목과 내용을 입력해주세요.</span>
                <button @click="closeNotification" 
                        style="background: none; border: none; color: white; margin-left: 10px; margin-top: 20px; background-color: #B1B1D2; font-size: 20px;
                        border-radius: 3px;">
                        확인</button>
            </div>

    


</template>


<script>
import { ref } from 'vue';

export default {
    setup() {
        const title = ref('');
        const content = ref('');
        const fileName = ref('');
        const showNotification = ref(false);

        const updateFileName = (event) => {
            const input = event.target;
            if (input.files.length > 0) {
                fileName.value = input.files[0].name;
            } else {
                fileName.value = '';
            }
        };

        const submitPost = async () => {
            console.log('제목:', title.value);
            console.log('내용:', content.value);
            console.log('첨부 파일:', fileName.value);

            if (!title.value || !content.value) {
                showNotification.value = true;
                return;
            }

            const getNickname = localStorage.getItem('nickname');

            const newPost = {
                // id: null,
                title: title.value,
                content: content.value,
                fileName: fileName.value,
                nickname: getNickname
            };

            try {
                // fetch를 사용하여 POST 요청 보내기
                const response = await fetch('http://localhost:8080/community-post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPost)
                });

                if (!response.ok) {
                    throw new Error('게시글 등록 실패');
                }

                const responseData = await response.json();
                console.log('게시글 등록 성공:', responseData);

            } catch (error) {
                console.error('게시글 등록 실패:', error);
            }

            title.value = '';
            content.value = '';
            fileName.value = '';
            showNotification.value = false;
        };

        const closeNotification = () => {
            showNotification.value = false;
        };

        return {
            title,
            content,
            fileName,
            updateFileName,
            submitPost,
            showNotification,
            closeNotification
        };
    },
};
</script>





<style>
    .input-title::placeholder {
        color: #B1B1D2;
        font-weight: bold;
    }

    .input-title:focus,  textarea:focus {
        outline: 0.3px solid #B1B1D2;
        box-shadow:0 0 5px rgba(173, 173, 255, 0.9);

        border-radius: 5px;
    }

    textarea{
        width: 100%;
        height: 440px;
        overflow-y: auto;
        padding: 15px;
        border: none;
        font-size: 21px;
    }

    textarea::placeholder{
        font-size: 21px;
        font-weight: lighter;
        color: #B1B1D2;
    }

    .custom-file-upload {
            display: inline-block;
            padding: 13px 13px;
            cursor: pointer;
            background-color: #b2b2cb;
            color: white;
            border-radius: 5px;
            text-align: center;
            transition: background-color 0.3s;
            font-size: 20px;
            text-wrap: nowrap;
            margin-right: 5px;

        }

        .custom-file-upload:hover {
            background-color: #9b95b3; /* 호버 시 색상 변경 */
        }

        /* 실제 파일 input 요소 숨기기 */
        input[type="file"] {
            display: none; /* 숨기기 */
        }

        #fileName {
            font-size: 16px;
            color: #333;
            border: 1px solid #B1B1D2;
            width: 80%;
            height: 34px;
            margin-right: 5px;

        }

        .notification{

            width: 427px; 
            height: 202px; 
            border-radius: 21px; 
            background-color: white; 
            border: 1px solid #B1B1D2; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            flex-direction: column;
            position: absolute;
            top: 36%;
            left: 600px;
            display: flex; 
            flex-direction: column;
        }


    .notification.show {
        display: flex; 
    }

    .notification.hide {
        display: none; 
    }

</style>