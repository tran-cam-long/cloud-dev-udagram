import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentItemComponent } from './comment-item.component';
import { commentItemMocks } from '../models/comment-item.model';

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentItemComponent);
    component = fixture.componentInstance;
    component.commentItem = commentItemMocks[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the feed id to the comment item', () => {
    const app = fixture.nativeElement;
    const feedId = app.querySelectorAll('.component-ref');
    expect(([].slice.call(feedId)).map((x) => x.innerText)).toContain(commentItemMocks[0].feedId);
  });

  it('should display the caption', () => {
    const app = fixture.nativeElement;
    const content = app.querySelectorAll('p');
    expect(([].slice.call(content)).map((x) => x.innerText)).toContain(commentItemMocks[0].content);
  });
});
