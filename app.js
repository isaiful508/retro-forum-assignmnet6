const latestPost = async () =>{
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    // console.log(data);

    // get id latest post conatiner
    const latestPostContainer = document.getElementById('latestPostContainer');

    data.forEach(post => {
        console.log(post);
        const div = document.createElement('div');
        div.innerHTML =`
        <div class="bg-white border border-[#12132D26] rounded-3xl p-6">
        <img class="w-full rounded-[20px] mb-4" src="${post.cover_image}" alt="">
        <div class="space-y-3">
            <div class="flex justify-start items-center">
                <i class="fa-regular fa-calendar"></i>
                <p>${post.author.posted_date}</p>
            </div>
            <h2 class="mulish-extraBold font-extrabold text-lg text-black">${post.title}</h2>
            <p class="inter-400">${post.description}</p>
            <div class="flex justify-start items-center gap-5">
                <div class="w-16 h-16 rounded-full">
                <img class="w-full rounded-full mb-4" src="${post.profile_image}" alt="">
                </div>
                <div>
                    <h2 class="mulish font-bold text-lg text-black">${post.author.name}</h2>
                    <p class="mulish text-sm">${post.author.designation}</p>
                </div>
            </div>
        </div>
    </div>
        `;
        latestPostContainer.appendChild(div);

    });
}

latestPost();