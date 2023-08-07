import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentItem } from '../models/comment-item.model';
import { CommentProviderService } from '../services/comment.provider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Input() commentItems: CommentItem[];
  @Input() feedId: string;
  subscriptions: Subscription[] = [];
  constructor( private comment: CommentProviderService ) { }

  async ngOnInit() {
    this.subscriptions.push(
      this.comment.currentComment$.subscribe((items) => {
      this.commentItems = items;
    }));

    await this.comment.getCommentForFeed(this.feedId);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
