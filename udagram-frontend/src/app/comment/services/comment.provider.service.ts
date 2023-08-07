import { Injectable } from '@angular/core';
import { CommentItem, commentItemMocks } from '../models/comment-item.model';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentProviderService {
  currentComment$: BehaviorSubject<CommentItem[]> = new BehaviorSubject<CommentItem[]>([]);

  constructor(private api: ApiService) { }

  async getCommentForFeed(feedId: string): Promise<BehaviorSubject<CommentItem[]>> {
    const req = await this.api.get('/comment/' + feedId);
    const items = <CommentItem[]> req.rows;
    this.currentComment$.next(items);
    return Promise.resolve(this.currentComment$);
  }

  async postCommentOnFeed(feedId: string, content: string): Promise<any> {
    const res = await this.api.post('/comment', {feedId: feedId, content: content});
    const comment = [res, ...this.currentComment$.value];
    this.currentComment$.next(comment);
    return res;
  }
}
