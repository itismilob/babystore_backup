import "../index.css";

document.querySelector("#footer").innerHTML = `

<footer class="bg-[#fafafa] mt-[180px] max-h-[280px] font-light text-[16px] text-left py-[10px]">
  <div class="my-3 ml-10">
    <div class="mb-3 font-normal text-sm">
      <p class="text-[rgb(83,82,82)]">애기어때</p>
    </div>

    <div class="mb-1">
      <ul class="space-x-5">
        <li class = inline-block><a href="#">회사소개</a></li>
        <li class = inline-block><a href="#">이용약관</a></li>
        <li class = inline-block><a href="#">개인정보처리방침</a></li>
        <li class = inline-block><a href="#">고객센터</a></li>
        <p class = inline-block>02-456-7890</p>
        <p class = inline-block>support@aegieottae.com</p>
      </ul>
    </div>

    <div class="mb-2">
      <ul class="space-x-5 text-xs">
        <li class = inline-block><a href="#">서울특별시 성동구 엘리스12길 34</a></li>
        <li class = inline-block><a href="#">사업자등록번호 123-45-67899</a></li>
        <li class = inline-block><a href="#">통신판매업신고 2023-성동구-1234</a></li>
      </ul>
    </div>

    <div class="space-x-5 text-xl">
      <a class = inline-block href="#" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
      <a class = inline-block href="#" target="_blank"><i class="fa-brands fa-square-facebook"></i></a>
      <a class = inline-block href="#" target="_blank"><i class="fa-brands fa-instagram"></i></a>
    </div>
  </div>
</footer>
`;