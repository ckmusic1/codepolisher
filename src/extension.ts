
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { polishCodeFlow } from './genkit-flows';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "codepolisher" is now active! ✨');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('codepolisher.fixCode', async () => {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            // Get the word within the selection
            const text = document.getText(selection);

            const config = vscode.workspace.getConfiguration('codepolisher');
            const isEnabled = config.get<boolean>('enable', true);

            if (!isEnabled) {
                vscode.window.showInformationMessage('CodePolisher is disabled.');
                return;
            }

            try {
                // Replace it with a fixed version (dummy implementation)
                // Here you would integrate with your code correction software.
                // This is just a placeholder.
                const fixedText = await polishCode(text);

                editor.edit(editBuilder => {
                    editBuilder.replace(selection, fixedText);
                });
                vscode.window.showInformationMessage('Code polished successfully! ✨');


            } catch (error: any) {
                vscode.window.showErrorMessage(`Error polishing code: ${error.message || error}`);
            }
        } else {
            vscode.window.showInformationMessage('No document opened. ⚠️');
        }
    });

    context.subscriptions.push(disposable);
}

async function polishCode(code: string): Promise<string> {
    // This is a placeholder for your code polishing logic.
    // Replace this with your actual code correction software integration.
    // For example, you could use Genkit to define a flow that uses an LLM to polish the code.
    try {
        // Replace with your Genkit flow call
        const polishedCode = await callGenkitFlow(code);
        return polishedCode;
    } catch (error: any) {
        console.error('Error in polishCode:', error);
        throw new Error(`Failed to polish code: ${error.message || error}`);
    }
}

async function callGenkitFlow(code: string): Promise<string> {
    // Replace 'your-genkit-flow' with the actual name of your Genkit flow
    // and adapt the input accordingly.
    // This is a placeholder, adapt based on your actual Genkit setup
    // and how you pass the code to be polished.

    // Check if the genkit flow is running
    try {
        const result = await polishCodeFlow({ code });
        return result.polishedCode;
    } catch (error: any) {
        console.error('Error calling Genkit flow:', error);
        vscode.window.showErrorMessage(`Error calling Genkit flow: ${error.message || error}`);
        return code; // Return the original code if the flow fails
    }
}


// This method is called when your extension is deactivated
export function deactivate() { }
