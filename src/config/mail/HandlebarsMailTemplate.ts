import handlebars from 'handlebars';
import fs from 'fs/promises';

interface ITemplateVariables {
   [key: string]: string | number;
}

interface IParseMail {
   file: string;
   variables: ITemplateVariables;
}

export default class HandlebarsMailTemplate {
   public async parse({ file, variables }: IParseMail): Promise<string> {
      const templateFileContent = await fs.readFile(file, {
         encoding: 'utf-8',
      });

      const parseTemplate = handlebars.compile(templateFileContent);

      return parseTemplate(variables);
   }
}
