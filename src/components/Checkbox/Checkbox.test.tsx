import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

test("Checkbox click", () => {
  const onCheckedChange = jest.fn();
  render(
    <Checkbox onCheckedChange={onCheckedChange} checked disabled={false}>
      Foo
    </Checkbox>
  );

  expect(screen.queryAllByRole("button")).toHaveLength(0);
  expect(screen.queryAllByRole("checkbox")).toHaveLength(1);
  expect(screen.queryAllByText("Foo")).toHaveLength(1);
  expect(onCheckedChange).not.toHaveBeenCalled();

  userEvent.click(screen.getByRole("checkbox"));
  expect(onCheckedChange).toBeCalledTimes(1);
  expect(onCheckedChange).lastCalledWith(false);
});

test("Checkbox click label", () => {
  const onCheckedChange = jest.fn();
  render(
    <Checkbox onCheckedChange={onCheckedChange} checked disabled={false}>
      Foo
    </Checkbox>
  );

  expect(screen.queryAllByRole("button")).toHaveLength(0);
  expect(screen.queryAllByRole("checkbox")).toHaveLength(1);
  expect(screen.queryAllByText("Foo")).toHaveLength(1);
  expect(onCheckedChange).not.toHaveBeenCalled();

  userEvent.click(screen.getByText("Foo"));
  expect(onCheckedChange).toBeCalledTimes(1);
  expect(onCheckedChange).lastCalledWith(false);
});

test("Checkbox multiple click label", () => {
  const onCheckedFoo = jest.fn();
  const onCheckedBar = jest.fn();
  const onCheckedBat = jest.fn();
  render(
    <div>
      <Checkbox id="a" onCheckedChange={onCheckedFoo}>
        Foo
      </Checkbox>
      <Checkbox id="b" onCheckedChange={onCheckedBar}>
        Bar
      </Checkbox>
      <Checkbox id="c" onCheckedChange={onCheckedBat}>
        Bat
      </Checkbox>
    </div>
  );

  expect(screen.queryAllByRole("button")).toHaveLength(0);
  expect(screen.queryAllByRole("checkbox")).toHaveLength(3);
  expect(onCheckedFoo).not.toHaveBeenCalled();
  expect(onCheckedBar).not.toHaveBeenCalled();
  expect(onCheckedBat).not.toHaveBeenCalled();

  userEvent.click(screen.getByText("Bar"));
  expect(onCheckedFoo).not.toHaveBeenCalled();
  expect(onCheckedBar).toBeCalledTimes(1);
  expect(onCheckedBat).not.toHaveBeenCalled();
  expect(onCheckedBar).lastCalledWith(true);
});

test("Checkbox disabled", () => {
  const onCheckedChange = jest.fn();
  render(
    <Checkbox onCheckedChange={onCheckedChange} checked disabled>
      Foo
    </Checkbox>
  );

  userEvent.click(screen.getByRole("checkbox"));
  userEvent.click(screen.getByText("Foo"));
  expect(onCheckedChange).not.toHaveBeenCalled();
});

test("Checkbox unbound", () => {
  const onCheckedChange = jest.fn();
  render(
    <Checkbox onCheckedChange={onCheckedChange} defaultChecked>
      Foo
    </Checkbox>
  );

  expect(screen.getByRole("checkbox")).toBeChecked();

  userEvent.click(screen.getByRole("checkbox"));
  expect(onCheckedChange).toBeCalledTimes(1);
  expect(screen.getByRole("checkbox")).not.toBeChecked();

  userEvent.click(screen.getByText("Foo"));
  expect(onCheckedChange).toBeCalledTimes(2);
  expect(screen.getByRole("checkbox")).toBeChecked();
});
