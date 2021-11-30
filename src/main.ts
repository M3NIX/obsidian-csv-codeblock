import { Plugin } from "obsidian";
import { parseString } from '@fast-csv/parse';

export default class CSVCodeBlockRender extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("csv", (source, el, ctx) => {

    var table = el.createEl("table");
    var body = table.createEl("tbody");

    // generate table header
    parseString(source, { headers: false, maxRows: 1, trim: true, ignoreEmpty: true })
      .on('error', function (error) { return console.error(error); })
      .on('data', function (row) {
        const tableRow = body.createEl("tr");
        for (var key in row) {
          tableRow.createEl("th", { text: row[key] });
        }
      });

    // generate normal table rows
    parseString(source, { headers: true, trim: true, ignoreEmpty: true })
      .on('error', function (error) { return console.error(error); })
      .on('data', function (row) {
        const tableRow = body.createEl("tr");
        for (var key in row) {
          tableRow.createEl("td", { text: row[key] });
        }
      });

    });
  }
}
