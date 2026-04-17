const { observations } = require('./data');
const {
  covariance,
  correlation,
  linearRegression,
  multipleRegression,
  anova,
  durbinWatson,
  breuschPagan,
  whiteTest,
  capm,
  autocorrelation,
  mean
} = require('./stats');

function buildAnalysis() {
  const x1 = observations.map((row) => row.x1);
  const x2 = observations.map((row) => row.x2);
  const y = observations.map((row) => row.y);
  const marketReturns = observations.map((row) => row.marketReturn);
  const assetReturns = observations.map((row) => row.assetReturn);
  const features = observations.map((row) => [row.x1, row.x2]);

  const linear = linearRegression(x1, y);
  const multiple = multipleRegression(features, y);
  const capmModel = capm(marketReturns, assetReturns);

  const groups = observations.reduce((acc, row) => {
    acc[row.category] = acc[row.category] || [];
    acc[row.category].push(row.y);
    return acc;
  }, {});

  const spatialGroups = observations.reduce((acc, row) => {
    acc[row.region] = acc[row.region] || [];
    acc[row.region].push(row.y);
    return acc;
  }, {});

  return {
    summary: {
      observations: observations.length,
      averageY: mean(y),
      averageMarketReturn: mean(marketReturns)
    },
    methods: {
      correlationAnalysis: {
        x1_y: correlation(x1, y),
        x2_y: correlation(x2, y),
        x1_x2: correlation(x1, x2)
      },
      covarianceAnalysis: {
        x1_y: covariance(x1, y),
        x2_y: covariance(x2, y),
        x1_x2: covariance(x1, x2)
      },
      regressionAnalysis: {
        linearRegression: {
          intercept: linear.intercept,
          slope: linear.slope
        },
        multipleRegression: {
          intercept: multiple.coefficients[0],
          x1: multiple.coefficients[1],
          x2: multiple.coefficients[2]
        }
      },
      timeSeriesAnalysis: {
        months: observations.map((row) => row.month),
        series: y,
        lag1Autocorrelation: autocorrelation(y, 1)
      },
      spatialCrossSectionalAnalysis: Object.fromEntries(
        Object.entries(spatialGroups).map(([region, values]) => [region, mean(values)])
      ),
      anova: anova(groups),
      capm: {
        alpha: capmModel.alpha,
        beta: capmModel.beta
      },
      regressionDiagnostics: {
        durbinWatson: durbinWatson(multiple.residuals),
        breuschPaganGodfrey: breuschPagan(multiple.residuals, features),
        whiteTest: whiteTest(multiple.residuals, features)
      }
    },
    raw: observations,
    derived: {
      linearPredicted: linear.predicted,
      multiplePredicted: multiple.predicted,
      capmPredicted: capmModel.predicted,
      multipleResiduals: multiple.residuals
    }
  };
}

if (require.main === module) {
  console.log(JSON.stringify(buildAnalysis(), null, 2));
}

module.exports = { buildAnalysis };
