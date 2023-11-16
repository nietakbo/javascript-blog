/* eslint-disable indent */
'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector='.post-tags .list',
  optAritcleAuthor='.post-author';

const generateTitleLinks = function(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearMessages(){
    titleList.innerHTML ='';
  }
  clearMessages();


  let html = '';

        
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */ /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  console.log(links);
  console.log(customSelector);
};

const generateTags = function(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
  /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
  /* make html variable with empty string */
    let html = '';
  /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
  /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
  /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
    /* add generated code to HTML variable */
        html = html + linkHTML;
  /* END LOOP: for each tag */
  }
  /* insert HTML of all the links into the tags wrapper */
  tagsList.innerHTML = html;
  /* END LOOP: for every article: */
    }
};
    const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement=this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  
   const addClickListenersToTags = function(){
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  };

  const generateAuthors = function(){
    const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
  /* find tags wrapper */
    const authorsList = article.querySelector(optAritcleAuthor);
  /* make html variable with empty string */
    let html = '';
  /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');            
    /* create HTML of the link */
    const linkHTML = '<p>by <a href="#author-'+ articleAuthor +'"><span>' + articleAuthor + '</span></a></p>';
    console.log(linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
    authorsList.innerHTML = html;
    }
  };


const authorClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement=this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for(let activeAuthor of activeAuthors){
    /* remove class active */
    activeAuthor.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
};


const addClickListenersToAuthors = function(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let link of links){
  /* add tagClickHandler as event listener for that link */
  link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
}
};
generateAuthors();
generateTags();
addClickListenersToTags();  
addClickListenersToAuthors();
generateTitleLinks();
