import handlebars from 'handlebars';

interface ITemplateVariables {
   [key: string]: string | number;
}

interface IParseMail {
   template: string;
   variables: ITemplateVariables;
}

export default class HandlebarsMailTemplate {
   public async parse({ template, variables }: IParseMail): Promise<string> {
      const parseTemplate = handlebars.compile(template);

      return parseTemplate(variables);
   }
}
