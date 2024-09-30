<template>
    <div style="padding: 20px; width: 1000px; margin-top: 83px;">
        <input class="input-title" type="text" placeholder="제목" style="font-size: 32px; background-color: none; border: none;"
            v-model="title" />
        <hr style="border: none; background-color: #B1B1D2; height: 1px; box-shadow: none;">
        <textarea name="" id="" placeholder="내용을 입력해주세요" v-model="content"></textarea>
        <hr style="border: none; background-color: #B1B1D2; height: 1px; box-shadow: none;margin-bottom: 30px;">
        
        <div style="display: flex; justify-content: space-around; align-items: center; height: 60px;">
            <label class="custom-file-upload font-300">
                파일 선택
                <input type="file" id="fileInput" accept="image/*" @change="updateFileName" />
            </label>
            <div id="fileName">{{ fileName }}</div>
            <button
                @click="submitPost"
                style="width: 90px; height: 42px; background-color: #101424; border-radius: 6px; font-size: 23px; color: white;"
                class="font-300"
            >
                등록
            </button>
        </div>
        
    </div>
    <div :class="['notification', showNotification ? 'show' : 'hide']">
        <span style="font-size: 20px;">제목과 내용을 입력해주세요.</span>
        <button @click="closeNotification" 
                style="background: none; border: none; color: white; margin-left: 10px; margin-top: 20px; background-color: #B1B1D2; font-size: 20px; border-radius: 3px;">
            확인
        </button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        
        const title = ref('');
        const content = ref('');
        const fileName = ref('');
        const showNotification = ref(false);
        const post = ref(null); // post 정의 추가

        onMounted(async () => {
            const postId = route.params.id;
            const response = await fetch(`http://localhost:8080/community-post/${postId}`);
            
            if (response.ok) {
                post.value = await response.json();
                // Populate the title and content with the existing post data
                title.value = post.value.title;
                content.value = post.value.content;
            } else {
                console.error('Failed to fetch the post data');
            }
        });

        const updateFileName = (event) => {
            const input = event.target;
            if (input.files.length > 0) {
                fileName.value = input.files[0].name;
            } else {
                fileName.value = '';
            }
        };

        const submitPost = async () => {
            if (!title.value || !content.value) {
                showNotification.value = true;
                return;
            }

            const getNickname = localStorage.getItem('nickname');
            const newPost = {
                title: title.value,
                content: content.value,
                nickname: getNickname
            };

            // const formData = new FormData();
            // formData.append('post', JSON.stringify(newPost));
            // if (fileName.value) {
            //     formData.append('file', document.getElementById('fileInput').files[0]);
            // }

            try {
                const response = await fetch('http://localhost:8080/community-post', {
                    method: 'POST',
                    // body: formData
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPost)  // 파일 없이 텍스트 데이터만 전송
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
        font-family: "Noto Sans KR", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal;
            
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
            padding: 5px 13px;
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
            background-color: #9b95b3; 
        }


        input[type="file"] {
            display: none; 
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

    .font-300{
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
}

    .font-500{
        font-family: "Noto Sans KR", sans-serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
    }

</style>