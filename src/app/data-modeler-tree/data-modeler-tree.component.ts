import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { IModelNode } from 'app/models/model-node';
import { TreeComponent } from 'angular-tree-component/dist/angular-tree-component';

@Component({
  selector: 'app-data-modeler-tree',
  templateUrl: './data-modeler-tree.component.html',
  styles: [`

.tree-node-focused > .node-wrapper > .node-content-wrapper > tree-node-content > .node-label {
  color: #ffb74d;
}

.tree-node-active.tree-node-focused > .node-wrapper > .node-content-wrapper {
  background: transparent !important;
}

.tree-node-active.tree-node-focused > .node-wrapper > .node-content-wrapper:hover {
  background: transparent !important;
}

.tree-node-active > .node-wrapper > .node-content-wrapper {
  background: transparent !important;
}
.tree-node-focused > .node-wrapper > .node-content-wrapper {
  background: transparent !important;
}

.node-content-wrapper:hover {
  background: transparent !important;
}

.tree-node-active > .node-wrapper > .node-content-wrapper, .tree-node-focused > .node-content-wrapper, .node-content-wrapper:hover {
  box-shadow: none !important;
}

.toggle-children {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTIwIDEybC0yLjgzIDIuODNMMjYuMzQgMjRsLTkuMTcgOS4xN0wyMCAzNmwxMi0xMnoiLz48L3N2Zz4=) !important;
    height: 24px !important;
    width: 24px !important;
    top: -3px !important;
}

.numeric {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 16px;
  width: 16px;
  display: inline-block;
background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMjU2LDBDMTE0LjYwOSwwLDAsMTE0LjYwOSwwLDI1NmMwLDE0MS4zOTEsMTE0LjYwOSwyNTYsMjU2LDI1NmMxNDEuMzkxLDAsMjU2LTExNC42MDksMjU2LTI1NiAgIEM1MTIsMTE0LjYwOSwzOTcuMzkxLDAsMjU2LDB6IE0yNTYsNDcyYy0xMTkuMjk3LDAtMjE2LTk2LjcwMy0yMTYtMjE2UzEzNi43MDMsNDAsMjU2LDQwczIxNiw5Ni43MDMsMjE2LDIxNlMzNzUuMjk3LDQ3MiwyNTYsNDcyeiAgICIgZmlsbD0iI2IwYmVjNSIvPgoJPGc+CgkJPHBhdGggZD0iTTI0OS43MDMsMjAxLjI1SDE4OHYtMjVoMTkuMzEyYzYuODU5LDAsMTMuNDIyLTEuMjE5LDE5LjUtMy41OTRjNi4xNzItMi4zNzUsMTEuNDM4LTUuNjQxLDE1Ljc5Ny05Ljc5NyAgICBjNC4zNTgtNC4yMDMsNy45MjItOS4yNSwxMC41NDctMTUuMjM0YzIuNzM0LTUuOTA2LDQuMDQ3LTEyLjUsNC4wNDctMTkuNjI1SDI4NHYyNTZoLTM0LjI5N1YyMDEuMjV6IiBmaWxsPSIjYjBiZWM1Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);
}

.string {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 16px;
  width: 16px;
  display: inline-block;
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE4Ny40OTYgMTg3LjQ5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTg3LjQ5NiAxODcuNDk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPHBhdGggZD0iTTkzLjc0OCwwQzQyLjA1NiwwLDAsNDIuMDU1LDAsOTMuNzQ4czQyLjA1Niw5My43NDgsOTMuNzQ4LDkzLjc0OHM5My43NDgtNDIuMDU1LDkzLjc0OC05My43NDhTMTQ1LjQ0LDAsOTMuNzQ4LDB6ICAgIE05My43NDgsMTczLjQ5NkM0OS43NzQsMTczLjQ5NiwxNCwxMzcuNzIxLDE0LDkzLjc0OFM0OS43NzQsMTQsOTMuNzQ4LDE0czc5Ljc0OCwzNS43NzUsNzkuNzQ4LDc5Ljc0OCAgIFMxMzcuNzIyLDE3My40OTYsOTMuNzQ4LDE3My40OTZ6IiBmaWxsPSIjYjBiZWM1Ii8+Cgk8cGF0aCBkPSJNOTkuODExLDU4LjM3Yy0xLjI1MS0yLjE2Ni0zLjU2Mi0zLjUtNi4wNjMtMy41cy00LjgxMiwxLjMzNC02LjA2MywzLjVsLTM0LjUsNTkuNzU2ICAgYy0xLjkzMywzLjM0OC0wLjc4NSw3LjYyOSwyLjU2Myw5LjU2MmMzLjM0OSwxLjkzNSw3LjYzLDAuNzg3LDkuNTYzLTIuNTYybDExLjI1OC0xOS41aDM0LjM1OGwxMS4yNTgsMTkuNSAgIGMxLjI5NywyLjI0NiwzLjY0OSwzLjUwMSw2LjA2OSwzLjUwMWMxLjE4OCwwLDIuMzkxLTAuMzAyLDMuNDkzLTAuOTM5YzMuMzQ4LTEuOTMzLDQuNDk1LTYuMjE0LDIuNTYzLTkuNTYyTDk5LjgxMSw1OC4zN3ogICAgTTg0LjY1Miw5MS42MjZsOS4wOTYtMTUuNzU2bDkuMDk2LDE1Ljc1Nkg4NC42NTJ6IiBmaWxsPSIjYjBiZWM1Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);
}

.object {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 16px;
  width: 16px;
  display: inline-block;
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CjxwYXRoIGZpbGw9IiNiMGJlYzUiIGQ9Ik0yLjEgMy4xYzAuMiAxLjMgMC40IDEuNiAwLjQgMi45IDAgMC44LTEuNSAxLjUtMS41IDEuNXYxYzAgMCAxLjUgMC43IDEuNSAxLjUgMCAxLjMtMC4yIDEuNi0wLjQgMi45LTAuMyAyLjEgMC44IDMuMSAxLjggMy4xczIuMSAwIDIuMSAwdi0yYzAgMC0xLjggMC4yLTEuOC0xIDAtMC45IDAuMi0wLjkgMC40LTIuOSAwLjEtMC45LTAuNS0xLjYtMS4xLTIuMSAwLjYtMC41IDEuMi0xLjEgMS4xLTItMC4zLTItMC40LTItMC40LTIuOSAwLTEuMiAxLjgtMS4xIDEuOC0xLjF2LTJjMCAwLTEgMC0yLjEgMHMtMi4xIDEtMS44IDMuMXoiLz4KPHBhdGggZmlsbD0iI2IwYmVjNSIgZD0iTTEzLjkgMy4xYy0wLjIgMS4zLTAuNCAxLjYtMC40IDIuOSAwIDAuOCAxLjUgMS41IDEuNSAxLjV2MWMwIDAtMS41IDAuNy0xLjUgMS41IDAgMS4zIDAuMiAxLjYgMC40IDIuOSAwLjMgMi4xLTAuOCAzLjEtMS44IDMuMXMtMi4xIDAtMi4xIDB2LTJjMCAwIDEuOCAwLjIgMS44LTEgMC0wLjktMC4yLTAuOS0wLjQtMi45LTAuMS0wLjkgMC41LTEuNiAxLjEtMi4xLTAuNi0wLjUtMS4yLTEuMS0xLjEtMiAwLjItMiAwLjQtMiAwLjQtMi45IDAtMS4yLTEuOC0xLjEtMS44LTEuMXYtMmMwIDAgMSAwIDIuMSAwczIuMSAxIDEuOCAzLjF6Ii8+Cjwvc3ZnPgo=);
}

.array {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 16px;
  width: 16px;
  display: inline-block;
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDEzMy45ODYgMTMzLjk4NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTMzLjk4NiAxMzMuOTg2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUxLjE1OCwxNC42MTdjNC4wMzcsMCw3LjMwOS0zLjI3MSw3LjMwOS03LjMwOFM1NS4xOTYsMCw1MS4xNTgsMEgzNi41NDJjLTQuMDM3LDAtNy4zMDksMy4yNzItNy4zMDksNy4zMDlWMTI2LjY4ICAgIGMwLDQuMDM0LDMuMjcxLDcuMzA3LDcuMzA5LDcuMzA3aDE0LjYxNmM0LjAzNywwLDcuMzA5LTMuMjcxLDcuMzA5LTcuMzA3YzAtNC4wMzctMy4yNzEtNy4zMS03LjMwOS03LjMxaC03LjMwOFYxNC42MTdINTEuMTU4eiIgZmlsbD0iI2IwYmVjNSIvPgoJCTxwYXRoIGQ9Ik04Mi44MjksMTE5LjM3Yy00LjAzNywwLTcuMzEsMy4yNzEtNy4zMSw3LjMxYzAsNC4wMzQsMy4yNzIsNy4zMDcsNy4zMSw3LjMwN2gxNC42MTVjNC4wMzcsMCw3LjMwOS0zLjI3MSw3LjMwOS03LjMwNyAgICBWNy4zMDljMC00LjAzNy0zLjI3MS03LjMwOS03LjMwOS03LjMwOUg4Mi44MjljLTQuMDM3LDAtNy4zMSwzLjI3Mi03LjMxLDcuMzA5czMuMjcyLDcuMzA4LDcuMzEsNy4zMDhoNy4zMDdWMTE5LjM3SDgyLjgyOXoiIGZpbGw9IiNiMGJlYzUiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
}

.boolean {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 16px;
  width: 16px;
  display: inline-block;
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjRweCIgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiPgogIDxnPgogICAgPHBhdGggZmlsbD0iI2IwYmVjNSIgZD0iTTMyLjAwMSwwYy0xNy42NDUsMC0zMiwxNC4zNTUtMzIsMzEuOTk5YzAsMTcuNjQ2LDE0LjM1NSwzMi4wMDEsMzIsMzIuMDAxUzY0LDQ5LjY0NSw2NCwzMS45OTkgICBDNjQsMTQuMzU1LDQ5LjY0NiwwLDMyLjAwMSwweiBNNC4wMDEsMzEuOTk5QzQuMDAxLDE2LjU2MSwxNi41NjMsNCwzMi4wMDEsNHY1NkMxNi41NjMsNjAsNC4wMDEsNDcuNDM4LDQuMDAxLDMxLjk5OXoiLz4KICA8L2c+Cjwvc3ZnPgo=);
}

.null {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 16px;
  width: 16px;
  display: inline-block;
  background-color: transparent;
}

.node-label {
  top: -3px;
  position: relative;
  margin-left: 5px;
}

.tree-node-leaf {
  padding-left: 15px;
}

.node-wrapper {
  overflow: hidden;
}
  `],
  encapsulation: ViewEncapsulation.None
})
export class DataModelerTreeComponent implements OnInit {

  @ViewChild('treeComponent') treeView: any;

  @Input() nodes: IModelNode[] = [];
  @Output() nodesChange = new EventEmitter<IModelNode[]>();
  @Output() focusNode = new EventEmitter<any>();
  @Output() treeNodeKeydown = new EventEmitter<KeyboardEvent>();

  focusedNode: IModelNode;

  constructor() { }

  ngOnInit() {
  }

  focus(event: any) {
    this.focusedNode = event.node.data;
    this.focusNode.emit(event);
  }

  keydown(event: KeyboardEvent) {
    this.treeNodeKeydown.emit(event);
  }

  getTree(): TreeComponent {
    return this.treeView;
  }

}
