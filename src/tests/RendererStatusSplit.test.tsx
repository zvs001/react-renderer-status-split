import ReactTestRenderer from "react-test-renderer";
import React from "react";
import RendererStatusSplit from "../RendererStatusSplit";

const defaultRenderProps = {
  renderPreview: () => <div>preview</div>,
  renderError: (error) => <div>error: {error}</div>,
  renderEmpty: () => <div>empty component</div>,
  renderLoading: () => <div>loading</div>,
  render: () => <div>render data</div>,
};

test("renders default when no handlers", async () => {
  const renderer = ReactTestRenderer.create(
    <RendererStatusSplit
      statuses={{
        isLoading: false,
        data: null,
        error: "",
        isDone: false,
      }}
      render={() => <div>render data</div>}
    />
  );

  expect(renderer).toMatchSnapshot();
});


test("renders preview before statuses change", async () => {
    const renderer = ReactTestRenderer.create(
        <RendererStatusSplit
            statuses={{
                isLoading: false,
                data: null,
                error: "",
                isDone: false,
            }}
            {...defaultRenderProps}
        />
    );

    expect(renderer).toMatchSnapshot();
});

test("isLoading renders correct", async () => {
  const renderer = ReactTestRenderer.create(
    <RendererStatusSplit
      statuses={{
        isLoading: true,
        error: "",
        isDone: false,
      }}
      {...defaultRenderProps}
    />
  );

  expect(renderer).toMatchSnapshot();
});




test("error renders correct", async () => {
    const renderer = ReactTestRenderer.create(
        <RendererStatusSplit
            statuses={{
                isLoading: false,
                error: "unexpected",
                isDone: false,
            }}
            {...defaultRenderProps}
        />
    );

    expect(renderer).toMatchSnapshot();
});

test("isDone renders empty when no data", async () => {
    const renderer = ReactTestRenderer.create(
        <RendererStatusSplit
            statuses={{
                isLoading: false,
                data: null,
                error: "",
                isDone: true,
            }}
            {...defaultRenderProps}
        />
    );

    expect(renderer).toMatchSnapshot();
});


test("isDone renders with data", async () => {
    const renderer = ReactTestRenderer.create(
        <RendererStatusSplit
            statuses={{
                isLoading: false,
                data: '123',
                error: "",
                isDone: true,
            }}
            {...defaultRenderProps}
        />
    );

    expect(renderer).toMatchSnapshot();
});


test("isEmpty(true) is handled correctly", async () => {
    const renderer = ReactTestRenderer.create(
        <RendererStatusSplit
            statuses={{
                isLoading: false,
                error: "",
                isDone: true,
            }}
            isEmpty={true}
            {...defaultRenderProps}
        />
    );

    expect(renderer).toMatchSnapshot();
});


test("isEmpty(false) is handled correctly", async () => {
    const renderer = ReactTestRenderer.create(
        <RendererStatusSplit
            statuses={{
                isLoading: false,
                error: "",
                isDone: true,
            }}
            isEmpty={false}
            {...defaultRenderProps}
        />
    );

    // console.log(renderer.toJSON());
    expect(renderer).toMatchSnapshot();
});



test("isEmpty(false) can skip loading state and proceed to render()", async () => {
    const renderer = ReactTestRenderer.create(
        <RendererStatusSplit
            statuses={{
                isLoading: true,
                error: "",
                isDone: false,
            }}
            isEmpty={false}
            {...defaultRenderProps}
        />
    );

    // console.log(renderer.toJSON());
    expect(renderer).toMatchSnapshot();
});
