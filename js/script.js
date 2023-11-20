/* eslint-disable no-undef */
/* eslint-disable indent */
'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagsLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};
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
  optAritcleAuthorSelector='.post-author',
  optTagsListSelector='.tags.list',
  optCloudClassCount='5',
  optCloudClassPrefix='tag-size-',
  optAuthorListSelector='.authors';

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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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


const calculateTagsParams = function(tags){
  const params = {max:0,min:999999};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
};
  const calculateTagClass = function(count,params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  };

const generateTags = function(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
        // const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagsLink(linkHTMLData);
    /* add generated code to HTML variable */
        html = html + linkHTML;
    /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
  /* END LOOP: for each tag */
    }
  /* insert HTML of all the links into the tags wrapper */
  tagsList.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    // allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    /* [NEW] generate code of a link and add it to allTagsHTML */
    // const tagLinkHTML = '<a href="#" class="' + calculateTagClass(allTags[tag], tagsParams) + '">'+ tag +' '+'</a>';
    // console.log('tagLinkHTML:', tagLinkHTML);

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
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
  let allAuthors={};

  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){

    const authorsList = article.querySelector(optAritcleAuthorSelector);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    // const linkHTML = '<p>by <a href="#author-'+ articleAuthor +'"><span>' + articleAuthor + '</span></a></p>';
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log(linkHTML);
    html = html + linkHTML;
    authorsList.innerHTML = html;
    if(!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    }
    else {
      allAuthors[articleAuthor]++;
    }   
 
  }
    const authorList = document.querySelector(optAuthorListSelector);
    const authorParams = calculateTagsParams(allAuthors);
    const allAuthorsData = {authors: []};
    for(let author in allAuthors){
      allAuthorsData.authors.push({
        tag: author,
        count: allAuthors[author],
        className: calculateTagClass(allAuthors[author], authorParams)
      });
    }
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
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


generateTags();
addClickListenersToTags();  
generateAuthors();
addClickListenersToAuthors();
generateTitleLinks();

