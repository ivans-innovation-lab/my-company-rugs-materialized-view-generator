import { Project } from "@atomist/rug/model/Project";
import { Generator, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator";
import { Pattern } from "@atomist/rug/operations/RugOperation";
import {
    cleanChangeLog, cleanReadMe, movePackage, removeUnnecessaryFiles,
    renameClass, updateCircleCI, updatePom,
} from "./RugGeneratorFunctions";

/**
 * Sample TypeScript generator used by AddNewQuerySideProject.
 */
@Generator("NewQuerySideProject", "Rug generator for a Spring Boot - Query Side project")
@Tags("spring", "query", "idugalic")
export class NewQuerySideProject implements PopulateProject {

    @Parameter({
        displayName: "Aggregate name",
        // tslint:disable-next-line:max-line-length
        description: "Aggragate name will be used to construct maven artifact identifier: my-company-[aggragateName.toLowerCase]-domain",
        pattern: "^[A-Z][-a-z0-9_]*$",
        // tslint:disable-next-line:max-line-length
        validInput: "a valid aggragate name, which starts with a lower-case letter and contains only alphanumeric, -, and _ characters",
        minLength: 1,
        maxLength: 50,
        required: true,
    })
    public aggregateName: string = "Aggregate";

    @Parameter({
        displayName: "Version",
        description: "initial version of the project, e.g., 1.2.3-SNAPSHOT",
        pattern: Pattern.semantic_version,
        validInput: "a valid semantic version, http://semver.org",
        minLength: 1,
        maxLength: 50,
        required: false,
    })
    public version: string = "0.1.0-SNAPSHOT";

    @Parameter({
        displayName: "Project Description",
        description: "short descriptive text describing the new project",
        pattern: Pattern.any,
        validInput: "free text sentence fragment",
        minLength: 1,
        maxLength: 100,
        required: false,
    })
    public description: string = "my new project";

    public populate(project: Project) {
        const artifactId: string = "my-company-" + this.aggregateName.toLowerCase() + "-materialized-view";
        const groupId: string = "com.idugalic";

        cleanReadMe(project, this.description, groupId);
        removeUnnecessaryFiles(project);
        updatePom(project, artifactId, groupId, this.version, this.description);
        movePackage(project, "com.idugalic.queryside.myaggregate.domain", groupId + ".queryside."
        + this.aggregateName.toLowerCase() + ".domain");
        movePackage(project, "com.idugalic.queryside.myaggregate.handler", groupId + ".queryside."
        + this.aggregateName.toLowerCase() + ".handler");
        movePackage(project, "com.idugalic.queryside.myaggregate.repository", groupId + ".queryside."
        + this.aggregateName.toLowerCase() + ".repository");
        renameClass(project, "MyAggregate", this.aggregateName);
        renameClass(project, "MyAggregateViewEventHandler", this.aggregateName + "ViewEventHandler");
        renameClass(project, "MyAggregateRepository", this.aggregateName + "Repository");
    }
}

export const newQuerySideProject = new NewQuerySideProject();
