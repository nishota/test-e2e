import { createReadStream, writeFileSync } from "fs";
import { parse } from "csv";
import { Feature } from "./cucumber/feature";
import { ColumnType } from "./column-type";
import { When } from "./operator/when";
import { Then } from "./operator/then";
import { Given } from "./operator/given";


function getOperations(d: any[]): Array<When | Then | Given> {
    const operations: Array<When | Then | Given> = [];
    if (d[ColumnType.When]) {
        operations.push(new When(d[ColumnType.When]));
    }
    if (d[ColumnType.Then]) {
        operations.push(new Then(d[ColumnType.Then]));
    }
    if (d[ColumnType.Given]) {
        operations.push(new Given(d[ColumnType.Given]));
    }
    return operations;
}

// TODO: エクセルからCSVへ変換
createReadStream(`test.csv`, { encoding: "utf8" })
    .pipe(parse({ columns: false }, (err, data: any[]) => {
        if (err) throw err;
        // TODO: あとでいい感じにする
        const autoData = data.filter(x => x[ColumnType.IsAuto] === '自動');
        const features: Feature[] = [];
        const featureData: { [name: string]: any[] } = {};
        let featureName = "";
        for (const iter of autoData) {
            if (iter[ColumnType.Name]) {
                featureName = iter[ColumnType.Name];
                features.push(new Feature(featureName, iter[ColumnType.Description]));
                featureData[featureName] = [iter];
            }
            else {
                featureData[featureName].push(iter);
            }
        }
        for (const f of features) {
            // background
            let background = ""
            let nowProcessingBackground = false;
            for (const d of featureData[f.name]) {
                if (d[ColumnType.Scenario]) {
                    nowProcessingBackground = false;
                }
                if (d[ColumnType.Background]) {
                    background = d[ColumnType.Background];
                    const operations = getOperations(d);
                    f.setBackground(background, operations);
                    nowProcessingBackground = true;
                }
                // d[ColumnType.Background]が空で次の行にオペレーションの続きが書いてある場合
                else if (nowProcessingBackground && !d[ColumnType.Scenario]) {
                    const operations = getOperations(d);
                    f.setBackground(background, operations);
                }
            }
            // scenario
            let scenario = ""
            let nowProcessingScenario = false;
            for (const d of featureData[f.name]) {
                if (d[ColumnType.Background]) {
                    nowProcessingScenario = false;
                }
                if (d[ColumnType.Scenario]) {
                    scenario = d[ColumnType.Scenario];
                    const operations = getOperations(d);
                    f.setScenarios(scenario, operations);
                    nowProcessingScenario = true;
                }
                // d[ColumnType.Scenario]が空で次の行にオペレーションの続きが書いてある場合
                else if (nowProcessingScenario && !d[ColumnType.Background]) {
                    const operations = getOperations(d);
                    f.setScenarios(scenario, operations);
                }
            }

            // output
            let result: string = `# This file was generated automatically at ${new Date().toLocaleString()}\n`
            result += f.getPart();
            if (f.background) {
                result += f.background.getPart();
            }
            if (f.scenarios) {
                for (const iter of f.scenarios) {
                    result += iter.getPart();
                }
            }
            // TODO: ファイルパスを指定できるようにしたい。nodeの実行場所からのpathっぽい
            writeFileSync(`../cypress/integration/${f.name}.auto.feature`, result);
        }
    }));
