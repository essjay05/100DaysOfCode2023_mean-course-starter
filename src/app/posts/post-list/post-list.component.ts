import { Component } from "@angular/core";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'] 
})

export class PostListComponent {
  posts = [
    {title: `First post title`, content: `This is the first post content, tada!!!....`},
    {title: `Second post title`, content: `This is the Second post content, tada!!!....`},
    {title: `Third post title`, content: `This is the Third post content, tada!!!....`},
    {title: `Fourth post title`, content: `This is the Fourth post content, tada!!!....`},
    {title: `Fifth post title`, content: `This is the Fifth post content, tada!!!....`},
    {title: `Sixth post title`, content: `This is the Sixth post content, tada!!!....`}
  ]
}