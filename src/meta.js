import * as R from "ramda";
import * as L from "partial.lenses";

export const Kind = {
  Region: ["regions", "region"],
  Artifact: ["artifacts", "artifact"]
};

export const Site = {
  artifactsIn: n => d =>
    L.collect([Kind.Artifact, L.elems, L.when(R.whereEq({ site_id: n }))], d)
};
