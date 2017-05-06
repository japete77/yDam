import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { IModelNode } from 'app/models/model-node';
import { MdSidenav, MdSelectChange, MdInputContainer, MdToolbar, MdCheckbox } from '@angular/material';
import { TreeComponent } from 'angular-tree-component/dist/angular-tree-component';
import { DataModelerTreeComponent } from 'app/data-modeler-tree/data-modeler-tree.component';
import { ModelsService } from 'app/services/models/models.service';
import { IMetadataModel } from 'app/models/metadata-model';
import { TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';
import { TdDialogService } from '@covalent/core';
import { ViewContainerRef, ElementRef, HostListener } from '@angular/core';
import { TranslateService } from 'app/translate';

@Component({
  selector: 'app-data-modeler',
  templateUrl: './data-modeler.component.html',
  styleUrls: ['./data-modeler.component.scss']
})
export class DataModelerComponent implements OnInit {

  @ViewChild('propertiesform') propertiesForm: any;
  @ViewChild('inputName') inputName: any;
  @ViewChild('sidenavPropertiesPanel') sidenavPropertiesPanel: MdSidenav;
  @ViewChild('treeComponent') treeComponent: DataModelerTreeComponent;
  @ViewChild('treeContainer') treeContainer: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  node: IModelNode;
  tree: TreeComponent;

  types: string[] = [ 'array', 'boolean', 'numeric', 'object', 'string' ];
  formats: string[] = [ null, 'date-time', 'email', 'hotname', 'ip4', 'ip6', 'uri' ];

  models: IMetadataModel[] = [];
  selectedModel: IModelNode[] = [];
  selectedModelType: string;

  overlayLoadingId = 'overlayModelLoading';
  offset = 90;

  constructor(private modelsService: ModelsService,
              private loadingService: TdLoadingService,
              private dialogService: TdDialogService,
              private viewContainerRef: ViewContainerRef,
              private renderer: Renderer,
              private translateService: TranslateService) {
    this.loadingService.create({
      name: this.overlayLoadingId,
      type: LoadingType.Circular,
      mode: LoadingMode.Indeterminate,
      color: 'accent',
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    // if (event.key.toLocaleLowerCase() === 'enter' && this.tree.treeModel.isFocused) {
    //   this.inputName.nativeElement.focus();
    //   this.inputName.nativeElement.selectionStart = 0;
    // }

    // if (event.key.toLocaleLowerCase() === 'enter') {
    //   this.tree.treeModel.focusNextNode();
    //   this.inputName.nativeElement.focus();
    //   this.inputName.nativeElement.selectionStart = 0;
    //   event.preventDefault();
    // }

    // if (event.shiftKey && event.key.toLocaleLowerCase() === 'enter') {
    //   this.tree.treeModel.focusPreviousNode();
    //   this.inputName.nativeElement.focus();
    //   this.inputName.nativeElement.selectionStart = 0;
    //   event.preventDefault();
    // }

    // if (event.altKey && event.key.toLowerCase() === 'arrowdown') {
    //   this.tree.treeModel.focusNextNode();
    // } else if (event.altKey && event.key.toLowerCase() === 'arrowup') {
    //   this.tree.treeModel.focusPreviousNode();
    // } else if (event.key.toLocaleLowerCase() === 'enter' && this.tree.treeModel.isFocused) {
    //   this.inputName.nativeElement.focus();
    //   this.inputName.nativeElement.selectionStart = 0;
    // }
  }

  keyDown(event: KeyboardEvent) {
    // if (event.keyCode === 13) {
    //   this.renderer.invokeElementMethod(this.propertiesForm.nativeElement,
    //     'dispatchEvent',
    //     [ new KeyboardEvent('keydown', { key: 'Tab' }) ]);
    // }
    // this.inputName.nativeElement.focus();
    // this.inputName.nativeElement.selectionStart = 0;
    // event.preventDefault();
  }

  treeNodeKeydown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if ((this.node.readonly && this.node.name !== 'model') ||
          this.node.type !== 'array' &&
          this.node.type !== 'object') {
            this.addNode();
          }
    }
  }

  ngOnInit() {

    this.tree = this.treeComponent.getTree();

    this.node = {
                  name: '',
                  type: ''
                };

    this.refreshModel();
  }

  refreshModel() {

    this.loadingService.register(this.overlayLoadingId);

    this.modelsService.getModels()
      .then((models: IMetadataModel[]) => {
          this.models = models;
          this.selectedModel = [];
          this.selectedModel.push(this.models[0].asset);
          this.node = this.selectedModel[0];
          this.selectedModelType = this.models[0].type;
          setTimeout(() => {
            this.tree.treeModel.update();
            this.tree.treeModel.expandAll();
          });
          this.loadingService.resolve(this.overlayLoadingId);
        })
      .catch(() => {
        this.showErrorMessage(null);
      });
  }

  focus(event: any) {
    // Update scroll acording to focused node
    if (event.node.position + this.offset > this.treeContainer.nativeElement.scrollTop + this.treeContainer.nativeElement.clientHeight) {
      this.treeContainer.nativeElement.scrollTop = event.node.position - this.treeContainer.nativeElement.clientHeight + this.offset;
    } else if (event.node.position < this.treeContainer.nativeElement.scrollTop) {
      this.treeContainer.nativeElement.scrollTop = event.node.position;
    }

    this.node = event.node.data;
    if (!this.sidenavPropertiesPanel.opened) {
      this.sidenavPropertiesPanel.open();
    }
  }

  closePropertiesPanel() {
    this.sidenavPropertiesPanel.toggle();
  }

  minimumChange() {
    if (!this.node.minimum) {
      this.node.exclusive_minimum = false;
    }
  }

  nodesChange(model: IModelNode[]) {
    this.selectedModel = model;
  }

  addNode() {
    if (this.tree.treeModel.focusedNode) {
      if (!this.tree.treeModel.focusedNode.children) {
        this.tree.treeModel.focusedNode.data.children = [];
      }
      this.tree.treeModel.focusedNode.data.children.push({
              name: 'child_' + this.tree.treeModel.focusedNode.data.children.length,
              type: 'string',
              readonly: false,
            });
      this.tree.treeModel.update();
      this.tree.treeModel.focusedNode.expand();
    }
  }

  deleteNode() {
    this.deleteNodeRecursive(this.tree.treeModel.nodes, this.node);
  }

  saveModels() {
    this.loadingService.register(this.overlayLoadingId);
    this.modelsService.saveModels(this.models)
    .then((result) => {
      this.loadingService.resolve(this.overlayLoadingId);
    });
  }

  private deleteNodeRecursive(nodes: IModelNode[], nodeToDelete: IModelNode) {
    const pos = nodes.indexOf(this.node);

    if (pos > -1) {
      const hasChildren = nodes[pos].children;

      nodes.splice(pos, 1);
      if (hasChildren) {
        this.tree.treeModel.update();
      }

      if (pos < nodes.length) {
        this.tree.treeModel.focusNextNode();
      } else {
        this.tree.treeModel.focusPreviousNode();
      }

      if (!hasChildren) {
        this.tree.treeModel.update();
      }
    } else {
      nodes.forEach(element => {
        if (element.children) {
          this.deleteNodeRecursive(element.children, nodeToDelete);
        }
      });
    }
  }

  expandNodes() {
    this.tree.treeModel.expandAll();
  }

  collapseNodes() {
    this.tree.treeModel.collapseAll();
  }

  selectModel() {
    this.fileInput.nativeElement.click();
  }

  importModel() {
    const fi = this.fileInput.nativeElement;

    if (fi.files && fi.files.length > 0) {

      this.loadingService.register(this.overlayLoadingId);

      this.modelsService.importModels(fi.files[0])
      .then((result: Response) => {

        this.fileInput.nativeElement.value = '';

        this.loadingService.resolve(this.overlayLoadingId);

        if (!result.ok) {
          this.showErrorMessage(result.statusText);
        } else {
          this.refreshModel();
        }

      });
    }
  }

  exportModel() {
    this.loadingService.register(this.overlayLoadingId);
    this.modelsService.exportModels()
    .then((result) => {
      this.loadingService.resolve(this.overlayLoadingId);
      if (!result) {
        this.showErrorMessage(null);
      }
    });
  }

  changeName(event: string) {
    this.node.name = event.replace(/[^a-zA-Z0-9_-]/gi, '_');
  }

  validateName(event: string) {
    const siblings = this.tree.treeModel.focusedNode.parent.children;
    for (const sibling of siblings) {
      if ((sibling.data.id !== this.node.id) &&
          (sibling.data.name === this.node.name)) {
        this.dialogService.openAlert({
          message: 'Property [' + this.node.name + '] must be unique in this level',
          disableClose: true,
          viewContainerRef: this.viewContainerRef,
          title: 'Error',
          closeButton: 'Close',
        }).afterClosed().subscribe(() => {
          this.inputName._mdInputChild.focus();
        });
      }
    }
  }

  changeModelType(event: MdSelectChange) {
    this.selectedModel = [];
    this.selectedModel.push(this.getModelByType(event.value));
    setTimeout(() => {
      this.tree.treeModel.update();
      this.tree.treeModel.expandAll();
    }, 0);
  }

  private getModelByType(modelType: string): IModelNode {
    if (this.models) {
      for (let i = 0; i < this.models.length; i++) {
        if (this.models[i].type === modelType) {
          return this.models[i].asset;
        }
      }
    }
    return null;
  }

  private showErrorMessage(message: string) {
    if (!message) {
      message = 'Error retriving data, please check the availability of the service API. Review console logs for more details.';
    }
    this.loadingService.resolve(this.overlayLoadingId);
    this.dialogService.openAlert({
      message: this.translateService.instant(message),
      disableClose: true,
      viewContainerRef: this.viewContainerRef,
      title: this.translateService.instant('Error'),
      closeButton: this.translateService.instant('Close'),
    });
  }
}
