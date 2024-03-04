const discuss = async (search='comedy') =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);
    const data = await res.json();
    // console.log(data.posts);

    const discussContainer = document.getElementById('discussContainer');

    // clear discuss container
    discussContainer.textContent = '';
    data.posts.forEach(card => {
       
         const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div >
            <div
              class="bg-[#F3F3F5] p-5 lg:p-10 rounded-3xl lg:flex justify-start items-start gap-8 hover:bg-[#797DFC1A] hover:border-[#797DFC] hover:border"
            >
              <div class="indicator">
              <span ${
                (card.isActive &&
                  `class='indicator-item badge badge-success rounded-full'`) ||
                `class='indicator-item badge badge-error rounded-full'`
              } >
              </span>

                <div>
                <img class=" w-[72px] h-[72px] rounded-2xl" src="${card.image}" alt="">
                </div>
              </div>
              <div class="space-y-5">
                <div class="flex justify-start items-center gap-5">
                  <h2># <span>${card.category}</span></h2>
                  <h2>Author: <span>${card.author.name}</span></h2>
                </div>
                <h2 class="mulish font-bold text-xl text-black">
                 ${card.title}
                </h2>
                <p class=" text-base font-normal">
                  ${card.description}
                </p>
                <div class="border-t-4 border-dashed"></div>
                <div class="lg:flex justify-between items-center">
                  <div class="lg:flex lg:justify-center gap-5 items-center">
                    <div class="flex lg:justify-center items-center gap-2">
                      <i class="fa-regular fa-message text-xl"></i>
                      <span class="text-xl">${card.comment_count}</span>
                    </div>
                    <div class="flex lg:justify-center items-center gap-2">
                      <i class="fa-regular fa-eye text-xl"></i>
                      <span class="text-xl">${card.view_count}</span>
                    </div>
                    <div class="flex lg:justify-center items-center gap-2">
                      <i class="fa-regular fa-clock text-xl"></i>
                      <span class="text-xl">${card.posted_time}</span>
                    </div>
                  </div>
                  <div class="">
                    <button onclick="handleButtonClick('${card.title.replace(/'/g,'@')}, ${card.view_count}')"
                      class="btn rounded-full bg-green-600 flex justify-center items-center"
                    >
                      <i
                        class="fa-solid fa-envelope-open text-xl p-1 text-white"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        `;
        discussContainer.appendChild(cardDiv);
    });

    // hide spinner and set time

    setTimeout( () => {
      switchLoadingSpinner(false);

    },2000);
   

    
}

//card button  handle
let count = 0;

const markReadContainer = document.getElementById('mark-read-container');

const handleButtonClick = (id) => {
    const para = id.split(',');
    const cardTitle = para[0];
    const cardViewCount = para[1];
     
const div = document.createElement('div');
div.innerHTML =`
<div
class="p-4 bg-white flex justify-between items-center gap-4 rounded-2xl"
>
<h2 class="mulish-semiBold font-semibold text-base text-black">
  ${cardTitle}
</h2>
<div class="flex justify-center gap-2 items-center">
  <i class="fa-regular fa-eye text-xl"></i>
  <span>${cardViewCount}</span>
</div>
</div>

`
markReadContainer.appendChild(div);
    
    count= count + 1;
  
    const markRead = document.getElementById('mark-read');
    markRead.innerText = count;
    
   
};


const latestPost = async () =>{
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    // console.log(data);

    // get id latest post conatiner
    const latestPostContainer = document.getElementById('latestPostContainer');

    data.forEach(post => {
        // console.log(post);
        const div = document.createElement('div');
        div.innerHTML =`
        <div class="bg-white border border-[#12132D26] rounded-3xl p-6">
        <img class="w-full rounded-[20px] mb-4" src="${post.cover_image}" alt="">
        <div class="space-y-3">
            <div class="flex justify-start items-center">
                <i class="fa-regular fa-calendar"></i>
                <p>${post.author.posted_date?post.author.posted_date:" No publish date"}</p>
            </div>
            <h2 class="mulish-extraBold font-extrabold text-lg text-black">${post.title}</h2>
            <p class="inter-400">${post.description}</p>
            <div class="flex justify-start items-center gap-5">
                <div class="w-16 h-16 rounded-full">
                <img class="w-full rounded-full mb-4" src="${post.profile_image}" alt="">
                </div>
                <div>
                    <h2 class="mulish font-bold text-lg text-black">${post.author.name}</h2>
                    <p class="mulish text-sm">${post.author.designation?post.author.designation:"Unknown"}</p>
                </div>
            </div>
        </div>
    </div>
        `;
        latestPostContainer.appendChild(div);

    });
}



// handle search button

const handleSearch = () =>{
    switchLoadingSpinner(true);
    const searchField = document.getElementById('search-field').value;
    console.log(searchField);
    discuss(searchField);

}


// loading spinner
const switchLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }else{
    loadingSpinner.classList.add('hidden');
  }
}

discuss();
latestPost();