# js1-emeline

AI log 

Asked how to clone the html-css repository which is my old Rainy Days website. I also asked why .DS_Store ended up in my first commit, and how to remove it. Got an explanation of .gitignore and the commands git rm --cached .DS_Store, plus an explanation that my image file names had to be lowercase to work on GitHub Pages (renamed with git mv -f). This was of course the logo and icons ect. as the productimages is only from the API. I ran the commands and checked the result on GitHub. 

 

Explained relative paths and checked my HTML paths. I fixed them myself but needed a clear view with how many ‘../’. The reason was after rearranging the folder structure and after that using the replace all function it got quite messy because I did not think about the new “scopes” in the html files as all were the same folder level in the original Rainy Days assignment.  

 

 

Asked about the query string and URLSearchParams. 

 

 Class .hidden didn’t work got reminded of CSS cascade. 

 

Got explained how to use path prefix as an attribute in my renderProducts function so I could use the same function from both category pages in the index. 

 

My filter radio buttons reacted to clicks in the gaps and looked bugged as the products suddenly dissapeared. I asked about this and I learned that I had to use ‘change’ and not ‘click’ as listener on the radio buttons. 

 

“Loading products...” stayed when the URL was wrong: a fetch at the top level of main.js crashed the module. AI explained the module loading order; I deleted the line. 

 

The basket saved the whole product in id: the parameter name didn’t match what was sent in.AI explained which lines to change. 

 

The wrong jacket was added: find compared product.id with itself. AI pointed out the line and how to fix it.  

 

The setTimeout syntax was wrong, and showError crashed because #message was missing. AI showed the corrected listener. 

 

I asked about CSS animation and other explanations for the toast. But settled on just placing it in the middle for not using much time on apperance. Got an explanation on WCAG, that role="status" makes the toast a live region, so screen readers read the message aloud when it appears.  Added toast.setAttribute("role", "status") for accessibility. Was not my idea, but I learned about it and kept it to remember. 

 

Generated the texts with <h2> and <p> for terms.html and privacy.html so it was fast to put it in the HTML files. So that part was all copy/paste AI.  

 

 
