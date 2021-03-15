<template>
    <div>
        <div class="sss">
            <img src="../assets/404.gif" >
        </div>

        <p class="page-container">出错了...</p>
        <p class="page-container">请返回...</p>
    </div>

</template>

<style scoped>
    .page-container {
        font-size: 24px;
        text-align: center;
        font-weight: bold;
        color: #888888;
        margin-top: 20px;
    }
    .sss{
        width: 100%;
        height: 50%;
        margin-top: 5%;
        text-align: center;
        border: none;
    }
    .sss img{
        max-height: 100%;max-width: 100%;border: none;
    }
    @media (max-width: 768px){
        .sss{
            width: 100%;
            height: 50%;
            margin-top: 25%;
            text-align: center;
            border: none;
        }
        .sss img{
            max-height: 50%;max-width: 50%;border: none;
        }
    }


</style>