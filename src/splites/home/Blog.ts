import readingTime from "reading-time";
import queryString from 'query-string'
import {Constants} from "../../constants/Constants";
import {GoogleEvent} from "../../Analytics";

export function initBlog() {
    const blogCategoryList = document.querySelectorAll('.blog-section .blog-posts .category-list > ul > li'),
        blogPostsWrapper = document.querySelector('.blog-section .blog-posts .posts'),
        blogPostContents = document.getElementById('blog-post-contents'),
        errorAlert = `<div class="alert">
<strong class="block">خطا!</strong>
<span>مشکلی در بارگذاری اطلاعات از سرور به وجود آمده‌است.</span>
</div>`;

    if (document.querySelectorAll('.blog-section .blog-posts .category-list > ul > li')) {
        getBlogPosts(null);

        if (blogCategoryList)
            blogCategoryList.forEach(item => {
                item.addEventListener('click', element => {
                    const tagID = item.getAttribute('data-tag');
                    if (!item.classList.contains('enable') && !blogPostsWrapper.classList.contains('loading')) {
                        blogCategoryList.forEach(category => category.classList.remove('enable'));
                        item.classList.add('enable');
                        GoogleEvent('Category', `Changed to '${element.target.innerText}'`, 'Blog');
                        setLoading();
                        getBlogPosts(tagID);
                    }
                })
            });
    }

    function setLoading(state = true) {
        if (state)
            return blogPostsWrapper.classList.add('loading');

        setTimeout(() => {
            blogPostsWrapper.classList.remove('loading');
        }, 500);
    }

    function getBlogPosts(tagID) {
        const parameters = {
            tags: [],
            per_page: 4,
            _embed: true,
        };

        if (tagID)
            parameters.tags = [tagID];

        fetch(`${Constants.blog.API}?${queryString.stringify(parameters)}`).then(response => {
            response.json().then(json => {
                const posts = json,
                    postsInfo = [];
                blogPostContents.innerHTML = '';
                posts.map(post => {
                    if (post && post.title) {
                        const categories = [],
                            featuredMedia = post._embedded['wp:featuredmedia'][0].media_details.sizes;

                        post.categories.map(category => {
                            if (category && Constants.blog.categories[+category])
                                categories.push(Constants.blog.categories[+category])
                        });

                        postsInfo.push({
                            time: Math.round(readingTime(post.content.rendered).minutes),
                            title: post.title.rendered,
                            categories,
                            image: featuredMedia.full.source_url,
                            url: post.link
                        });
                    }
                });

                postsInfo.map((postInfo, index) => {
                    blogPostContents.innerHTML += `
                                <div class="col-md-3 col-xs-12 col-sm-6 wow fadeInLeft" data-wow-delay="0.${index + 1}s">
   <a class="blog-card block" href="${postInfo.url}" target="_blank">
      <div class="post-image flex center-row no-select no-drag"><img src="${postInfo.image}" alt="${postInfo.title}"></div>
      <div class="content-holder">
         <div class="post-tags">
         ${(postInfo.categories.map(category => `<span class="label solid-orange small-text small">${category.title}</span>`).join(' '))}
         </div>
         <h3 class="post-title">
            ${postInfo.title}
         </h3>
         <div class="post-info no-select">
            <span class="block">
            <i class="icon-schedule"></i>
            ${postInfo.time} دقیقه خواندن
            </span>
         </div>
      </div>
   </a>
</div>
`;
                });

                blogPostContents.querySelectorAll('.blog-card').forEach(element => {
                    element.addEventListener('click', element => {
                        const postTitle = element.target.querySelector('.post-title').innerText;
                        GoogleEvent('Article', `Click on '${postTitle}'`, 'Blog');
                    });
                });


                setLoading(false);
            }).catch(() => {
                blogPostContents.innerHTML = errorAlert;
                setLoading(false);
            });
        }).catch(() => {
            blogPostContents.innerHTML = errorAlert;
            setLoading(false);
        });
    }
}