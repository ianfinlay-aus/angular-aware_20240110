import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { NumericTextBoxModule, ColorPickerModule, UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ComboBoxAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TreeViewModule  } from '@syncfusion/ej2-angular-navigations';
import { DiagramAllModule, SymbolPaletteAllModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';
import { AccumulationAnnotationService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { Component, ViewEncapsulation } from '@angular/core';
import {
    NodeModel, DiagramTools, ScrollSettingsModel, LayoutModel,
    Diagram, ConnectorModel, Node, SnapConstraints, SnapSettingsModel,
    Container, TextElement, StackPanel, ImageElement, DataBinding, HierarchicalTree, TreeInfo
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './overview-data.json';
Diagram.Inject(DataBinding, HierarchicalTree);


/**
 * Sample for Overview layout
 */
@Component({
    standalone: true,
    imports: [ DiagramAllModule, ChartAllModule, GridAllModule, SymbolPaletteAllModule, OverviewAllModule, ButtonModule,       ColorPickerModule,  DateRangePickerModule, CheckBoxModule, AccumulationChartModule, ToolbarModule, DropDownButtonModule, UploaderModule, CircularGaugeModule, DropDownListAllModule, ListViewAllModule,       DialogAllModule, TextBoxModule, RadioButtonModule, ComboBoxAllModule, SplitButtonModule,       MultiSelectModule, NumericTextBoxModule, TreeViewModule ],
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    public data: Object = {
        id: 'Id', parentId: 'ReportingPerson', dataSource: new DataManager((Data as any).data)
    };

    public layout: LayoutModel = {
        type: 'OrganizationalChart', margin: { top: 20 },
        getLayoutInfo: (node: Node, tree: TreeInfo) => {
            if (!tree.hasSubTree) {
                tree.orientation = 'Vertical';
                tree.type = 'Right';
            }
        }
    };

    public nodeDefaults(obj: NodeModel): NodeModel {
        obj.height = 50;
        obj.style = { fill: 'transparent', strokeWidth: 2 };
        return obj;
    };

    public connDefaults(connector: ConnectorModel): ConnectorModel {
        connector.targetDecorator.shape = 'None';
        connector.type = 'Orthogonal';
        connector.style.strokeColor = 'gray';
        return connector;
    };

    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public scrollSettings: ScrollSettingsModel = { scrollLimit: 'Infinity' };

    public setNodeTemplate(obj: NodeModel, diagram: Diagram): Container {
        let content: StackPanel = new StackPanel();
        content.id = obj.id + '_outerstack';
        content.orientation = 'Horizontal';
        content.style.strokeColor = 'gray';
        content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
        let image: ImageElement = new ImageElement();
        image.width = 50;
        image.height = 50;
        image.style.strokeColor = 'none';
        image.source = (obj.data as EmployeeInfo).ImageUrl;
        image.id = obj.id + '_pic';
        let innerStack: StackPanel = new StackPanel();
        innerStack.style.strokeColor = 'none';
        innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
        innerStack.id = obj.id + '_innerstack';

        let text: TextElement = new TextElement();
        text.content = (obj.data as EmployeeInfo).Name;
        text.style.color = 'black';
        text.style.bold = true;
        text.style.strokeColor = 'none';
        text.horizontalAlignment = 'Left';
        text.style.fill = 'none';
        text.id = obj.id + '_text1';

        let desigText: TextElement = new TextElement();
        desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
        desigText.content = (obj.data as EmployeeInfo).Designation;
        desigText.style.color = 'black';
        desigText.style.strokeColor = 'none';
        desigText.style.fontSize = 12;
        desigText.style.fill = 'none';
        desigText.horizontalAlignment = 'Left';
        desigText.style.textWrapping = 'Wrap';
        desigText.id = obj.id + '_desig';
        innerStack.children = [text, desigText];

        content.children = [image, innerStack];

        return content;
    };
}
export interface EmployeeInfo {
    Name: string;
    Designation: string;
    ImageUrl: string;
}
